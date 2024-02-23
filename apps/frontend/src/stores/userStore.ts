import { defineStore } from 'pinia';
import { ref } from 'vue';

interface IUserResponse extends Response {
  data: IUser
}

interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  token: string;
}



export const useUserStore = defineStore('userStore', () => {

  //@ts-expect-error: nuxt types
  const { apiBase } = useRuntimeConfig().public;
  //@ts-expect-error: nuxt types
  const headers = useRequestHeaders(['cookie', 'content-type', 'accept'])
  const isModalVisible = ref(false);
  const username = ref('')
  const email = ref('')
  const token = ref('')
  const isLoggedIn = ref(false)
  const loginError = ref('');
  const userModalState = ref('login');
  const isUserMenuVisible = ref(false);

  // env
  const register = async (request) => {
    console.log(request)
    try {
      //@ts-expect-error: nuxt types
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(request)
      })
      setCookie(response)
      setUser(response.data)
    }
    catch (e: any) {
      loginError.value = e.message
    }
  }

  // login
  const login = async (request) => {
    console.log(request)
    try {
      //@ts-expect-error: nuxt types
      const response: IUserResponse = await $fetch(`${apiBase}/api/v1/users/login`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(request)
      });
      // setCookie(response)
      setUser(response.data);
    } catch (e: any) {
      loginError.value = e.message;
    }
  };

  const setCookie = (response: IUserResponse) => {
    const token = response.data.token
    //@ts-expect-error: nuxt types
    const cookie = useCookie('token')
    cookie.value = token
  }

  // set user
  const setUser = (response: IUser) => {
    console.log(response)
    username.value = response.username
    email.value = response.email
    token.value = response.token
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

  return { isModalVisible, username, email, token, isLoggedIn, loginError, userModalState, login, register, setUser, logout, isUserMenuVisible }
})
