import { useRequestHeaders, useRuntimeConfig } from 'nuxt/app';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { IUser, IUserModalState, IUserResponse, IUpdatePasswordRequest } from 'types';

export const useUserStore = defineStore('userStore', () => {
  // request options
  const { apiBase } = useRuntimeConfig().public;
  const backendUrl = process.env.NODE_ENV === 'development' ? `${apiBase}/api/v1` : '/api/v1'
  const headers = useRequestHeaders(['cookie', 'accept', 'authorization'])

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
  const userError = ref('');
  const resetHashToken = ref('')
  const photo = ref('')

  // admin stuff
  const users = ref([])

  // watch for changes
  watch(isUserMenuVisible, () => {
    if (!isUserMenuVisible.value) userModalState.value = 'login'
  })

  watch(isModalVisible, () => {
    if (!isModalVisible.value) {
      userModalState.value = 'login'
      userError.value = ''
    }
  })

  watch(userModalState, () => {
    if (userModalState.value !== 'login') {
      isModalVisible.value = true
    }
  })

  // get users, admin only
  const getUsers = async () => {
    try {
      const response: IUserResponse = await $fetch(`${backendUrl}/users/getUsers`, {
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
    console.log(user)
    if (!user) return
    id.value = user.id
    username.value = user.username
    role.value = user.role
    email.value = user.email
    token.value = user.token
    isLoggedIn.value = true
    photo.value = user.photo
    return
  }

  // register
  const register = async (request) => {
    try {
      const response: IUserResponse = await $fetch(`${backendUrl}/users/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(request)
      })
      setUser(response.data.user)
      userModalState.value = 'registerConfirm'
    }
    catch (e: any) {
      userError.value = "Er ging iets mis bij het aanmaken. Probeer het opnieuw."
    }
  }

  // login
  const login = async (request) => {
    try {
      const response: IUserResponse = await $fetch(`${backendUrl}/users/login`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(request)
      });
      setUser(response.data.user);
      userModalState.value = 'loginConfirm'
    } catch (e: any) {
      console.log('Error:', e)
      userError.value = "Login mislukt. Controleer je gegevens en probeer het opnieuw.";
    }
  };

  // update password
  const updatePassword = async (request: IUpdatePasswordRequest) => {
    if (resetHashToken.value) return resetPassword(request)
    try {
      request.id = id.value
      const response: IUserResponse = await $fetch(`${backendUrl}/users/updatePassword`, {
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
      userError.value = "Er ging iets mis bij het updaten van je wachtwoord. Probeer het opnieuw.";
    }
  }

  // reset password
  const resetPassword = async (request: IUpdatePasswordRequest) => {
    try {
      const response: IUserResponse = await $fetch(`${backendUrl}/users/resetPassword/${resetHashToken.value}`, {
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
      userError.value = "Er ging iets mis bij het updaten van je wachtwoord. Probeer het opnieuw.";
    }
  }

  // check token
  const checkToken = async () => {
    if (isLoggedIn.value) return
    try {
      const response: any = await $fetch(`${backendUrl}/users/checkToken`, {
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
      const response: any = await $fetch(`${backendUrl}/users/forgotPassword`, {
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
      await $fetch(`${backendUrl}/users/logout`, {
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
  const updateMe = async (request) => {
    console.log(request)
    try {
      const response: IUserResponse = await $fetch(`${backendUrl}/users/updateMe`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers
        },
        credentials: 'include',
        body: JSON.stringify(request)
      });
      username.value = request.username
      email.value = request.email
      userModalState.value = 'editConfirm'

    } catch (error) {
      userError.value = "Er ging iets mis bij het updaten van je gegevens. Probeer het opnieuw.";
    }
  }

  // update user
  const deleteAccount = async () => {
    try {
      const response: IUserResponse = await $fetch(`${backendUrl}/users/deleteMe`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });
      clearUser()
      userModalState.value = 'deleteConfirm'
    } catch (error) {
      userError.value = "Er ging iets mis bij het updaten van je gegevens. Probeer het opnieuw.";
    }
  }
  return {
    isModalVisible,
    username,
    email,
    token,
    isLoggedIn,
    userError,
    userModalState,
    isUserMenuVisible,
    resetHashToken,
    role,
    photo,
    getUsers,
    login,
    register,
    setUser,
    updatePassword,
    checkToken,
    logOut,
    sendResetPassword,
    updateMe,
    deleteAccount
  }
})
