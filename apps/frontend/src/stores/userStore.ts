import { useCookie, useRequestHeaders, useRuntimeConfig } from 'nuxt/app';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

interface IUserResponse extends Response {
  data: {
    users?: IUser[]
    user?: IUser
  }
}

interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  token: string;
}

interface IUserLoginRequest {
  password: string;
  rememberMe: boolean;
  email: string;
}

type IUserModalState =
  'login'
  | 'register'
  | 'reset'
  | 'forgot'
  | 'update'
  | 'terms'
  | 'edit'
  | 'delete'
  | 'loginConfirm'
  | 'registerConfirm'
  | 'logoutConfirm'
  | 'resetConfirm'
  | 'forgotConfirm'
  | 'editConfirm'
  | 'deleteConfirm'


interface IUpdatePasswordRequest {
  id?: string | number;
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

export const useUserStore = defineStore('userStore', () => {
  // request options
  const { apiBase } = useRuntimeConfig().public;
  const headers = useRequestHeaders(['cookie', 'content-type', 'accept', 'authorization'])

  // state of the modal and user menu
  const isModalVisible = ref(false);
  const userModalState = ref<IUserModalState>('login')
  const isUserMenuVisible = ref(false);

  // state of the user
  const id = ref('')
  const username = ref('')
  const role = ref('')
  const email = ref('')
  const token = ref('')
  const isLoggedIn = ref(false)
  const loginError = ref('');
  const resetHashToken = ref('')

  // admin stuff
  const users = ref([])

  // watch for changes
  watch(isUserMenuVisible, () => {
    if (!isUserMenuVisible.value) userModalState.value = 'login'
  })

  watch(isModalVisible, () => {
    if (!isModalVisible.value) {
      userModalState.value = 'login'
      loginError.value = ''
    }
  })

  watch(userModalState, () => {
    if (userModalState.value !== 'login') {
      isModalVisible.value = true
    }
  })

  const getUsers = async () => {
    try {
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/getUsers`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });
      users.value = response.data.users
    } catch (error) {
      console.error('Error getting users:', error);
    }
  }

  // set user after register, login or checkToken
  const setUser = (user: IUser) => {
    if (!user) return
    id.value = user.id
    username.value = user.username
    role.value = user.role
    email.value = user.email
    token.value = user.token
    isLoggedIn.value = true
    return
  }

  // register
  const register = async (request) => {
    try {
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(request)
      })
      setUser(response.data.user)
      userModalState.value = 'registerConfirm'
    }
    catch (e: any) {
      loginError.value = "Er ging iets mis bij het aanmaken. Probeer het opnieuw."
    }
  }

  // login
  const login = async (request) => {
    try {
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/login`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(request)
      });
      setUser(response.data.user);
      if (!request.rememberMe) {
        const cookie = useCookie('token')
        //@ts-expect-error: nuxt types
        cookie.options.expires = 1;
      }
      userModalState.value = 'loginConfirm'
    } catch (e: any) {
      loginError.value = "Login mislukt. Controleer je gegevens en probeer het opnieuw.";
    }
  };

  // update password
  const updatePassword = async (request: IUpdatePasswordRequest) => {
    if (resetHashToken.value) return resetPassword(request)
    try {
      request.id = id.value
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/updatePassword`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        credentials: 'include',
        body: JSON.stringify(request)
      });
      setUser(response.data.user);
      userModalState.value = 'resetConfirm'
    } catch (e: any) {
      loginError.value = "Er ging iets mis bij het updaten van je wachtwoord. Probeer het opnieuw.";
    }
  }

  // reset password
  const resetPassword = async (request: IUpdatePasswordRequest) => {
    try {
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/resetPassword/${resetHashToken.value}`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        credentials: 'include',
        body: JSON.stringify(request)
      });
      setUser(response.data.user);
      userModalState.value = 'resetConfirm'
      resetHashToken.value = ''
    } catch (e: any) {
      loginError.value = "Er ging iets mis bij het updaten van je wachtwoord. Probeer het opnieuw.";
    }
  }

  // check token
  const checkToken = async () => {
    if (isLoggedIn.value) return
    try {
      const response: any = await $fetch(`${apiBase}/api/v1/users/checkToken`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
      });
      setUser(response.data.user)
      return
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  // clear user
  const clearUser = () => {
    id.value = ''
    username.value = ''
    role.value = ''
    email.value = ''
    token.value = ''
    isLoggedIn.value = false
  }

  // send reset password
  const sendResetPassword = async (email: string) => {
    try {
      const response: any = await $fetch(`${apiBase}/api/v1/users/forgotPassword`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email })
      });
      userModalState.value = 'forgotConfirm'
    } catch (error) {
      console.error('Error sending reset password:', error);
    }
  }

  // log out
  const logOut = async () => {
    try {
      await $fetch(`${apiBase}/api/v1/users/logout`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
      });
      clearUser()
      isModalVisible.value = true;
      userModalState.value = 'logoutConfirm';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // update user
  const update = async (request) => {
    try {
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/updateMe`, {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify(request)
      });
      username.value = request.username
      email.value = request.email
      userModalState.value = 'editConfirm'

    } catch (error) {
      loginError.value = "Er ging iets mis bij het updaten van je gegevens. Probeer het opnieuw.";
    }
  }

  // update user
  const deleteAccount = async () => {
    try {
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/deleteMe`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });
      clearUser()
      userModalState.value = 'deleteConfirm'
    } catch (error) {
      loginError.value = "Er ging iets mis bij het updaten van je gegevens. Probeer het opnieuw.";
    }
  }
  return {
    isModalVisible,
    username,
    email,
    token,
    isLoggedIn,
    loginError,
    userModalState,
    isUserMenuVisible,
    resetHashToken,
    role,
    getUsers,
    login,
    register,
    setUser,
    updatePassword,
    checkToken,
    logOut,
    sendResetPassword,
    update,
    deleteAccount
  }
})
