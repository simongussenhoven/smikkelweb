import { defineStore } from 'pinia';
import { ref } from 'vue';

interface IUserResponse extends Response {
  data: {
    user: IUser
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

type IUserModalState = 'login' | 'register' | 'reset' | 'forgot' | 'update' | 'loggedOut';

interface IUpdatePasswordRequest {
  id?: string | number;
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

export const useUserStore = defineStore('userStore', () => {

  //@ts-expect-error: nuxt types
  const { apiBase } = useRuntimeConfig().public;
  //@ts-expect-error: nuxt types
  const headers = useRequestHeaders(['cookie', 'content-type', 'accept', 'authorization'])
  const isModalVisible = ref(false);
  const id = ref('')
  const username = ref('')
  const email = ref('')
  const token = ref('')
  const isLoggedIn = ref(false)
  const loginError = ref('');
  const userModalState = ref<IUserModalState>('login')
  const isUserMenuVisible = ref(false);
  const resetHashToken = ref('')

  // env
  const register = async (request) => {
    try {
      //@ts-expect-error: nuxt types
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(request)
      })
      // setCookie(response)
      setUser(response.data.user)
    }
    catch (e: any) {
      loginError.value = "Er ging iets mis bij het aanmaken. Probeer het opnieuw."
    }
  }

  // login
  const login = async (request) => {
    try {
      //@ts-expect-error: nuxt types
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/login`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(request)
      });
      // setCookie(response)
      setUser(response.data.user);
      if (!request.rememberMe) {
        //@ts-expect-error: nuxt types
        const cookie = useCookie('token')
        cookie.options.expires = 1;
      }
    } catch (e: any) {
      loginError.value = "Login mislukt. Controleer je gegevens en probeer het opnieuw.";
    }
  };

  // set user
  const setUser = (user: IUser) => {
    if (!user) return
    id.value = user.id
    username.value = user.username
    email.value = user.email
    token.value = user.token
    isLoggedIn.value = true
    isModalVisible.value = false
    return
  }

  const updatePassword = async (request: IUpdatePasswordRequest) => {
    // when a reset is performed with reset token
    if (resetHashToken.value) return resetPassword(request)

    //when reset is performed with logged in user
    try {
      request.id = id.value
      //@ts-expect-error: nuxt types
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/updatePassword`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        credentials: 'include',
        body: JSON.stringify(request)
      });
      setUser(response.data.user);
    } catch (e: any) {
      loginError.value = "Er ging iets mis bij het updaten van je wachtwoord. Probeer het opnieuw.";
    }
  }

  const resetPassword = async (request: IUpdatePasswordRequest) => {
    try {
      //@ts-expect-error: nuxt types
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/resetPassword/${resetHashToken.value}`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        credentials: 'include',
        body: JSON.stringify(request)
      });
      setUser(response.data.user);
      resetHashToken.value = ''
    } catch (e: any) {
      loginError.value = "Er ging iets mis bij het updaten van je wachtwoord. Probeer het opnieuw.";
    }
  }

  const checkToken = async () => {
    if (isLoggedIn.value) return
    try {
      //@ts-expect-error: nuxt types
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

  const clearUser = () => {
    id.value = ''
    username.value = ''
    email.value = ''
    token.value = ''
    isLoggedIn.value = false
  }

  const sendResetPassword = async (email: string) => {
    try {
      //@ts-expect-error: nuxt types
      const response: any = await $fetch(`${apiBase}/api/v1/users/forgotPassword`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email })
      });
      return response
    } catch (error) {
      console.error('Error sending reset password:', error);
    }
  }

  const logOut = async () => {
    try {
      //@ts-expect-error: nuxt types
      const response: any = await $fetch(`${apiBase}/api/v1/users/logout`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
      });
      clearUser()
      isModalVisible.value = true;
      userModalState.value = 'loggedOut';
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };
  return { isModalVisible, username, email, token, isLoggedIn, loginError, userModalState, login, register, setUser, updatePassword, checkToken, logOut, sendResetPassword, isUserMenuVisible, resetHashToken }
})
