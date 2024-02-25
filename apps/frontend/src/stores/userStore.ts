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

interface IUserLoginRequest extends Request {
  username: string;
  password: string;
  rememberMe: boolean;
  email: string;
}

type IUserModalState = 'login' | 'register' | 'reset'

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
  const login = async (request: IUserLoginRequest) => {
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
    id.value = user.id
    username.value = user.username
    email.value = user.email
    token.value = user.token
    isLoggedIn.value = true
    isModalVisible.value = false
    return
  }

  const logout = () => {
    //@ts-expect-error: nuxt types
    const cookie = useCookie('token')
    cookie.value = ''
    isLoggedIn.value = false
    username.value = ''
    email.value = ''
    token.value = ''
  }

  const updatePassword = async (request: IUpdatePasswordRequest) => {
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

  const checkToken = async () => {
    try {
      //@ts-expect-error: nuxt types
      const token = useCookie('token');
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
  return { isModalVisible, username, email, token, isLoggedIn, loginError, userModalState, login, register, setUser, logout, updatePassword, checkToken, isUserMenuVisible }
})
