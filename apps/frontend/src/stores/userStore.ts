import { useRequestHeaders, useRuntimeConfig } from 'nuxt/app';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
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
  const isLoading = ref(true);

  // state of the user

  const id = ref(null)
  const username = ref(null)
  const role = ref(null)
  const email = ref(null)
  const token = ref(null)
  const isLoggedIn = ref(false)
  const userError = ref(null)
  const resetHashToken = ref(null)
  const photo = ref(null)
  const lastUpdated = ref(Date.now().toString())
  const photoPath = computed(() => `${backendUrl}/public/img/users/${photo.value}`)
  const useDarkmode = ref(true)

  // dark mode stuff
  const setDarkmode = () => {
    const isDark = localStorage.getItem('useDarkMode')
    useDarkmode.value = isDark === 'true'
  }

  const toggleDarkmode = async () => {
    useDarkmode.value = !useDarkmode.value
    localStorage.setItem('useDarkMode', useDarkmode.value.toString())
  }
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
  const setUser = async (user: IUser) => {
    if (!user) return
    if (user.password) console.error('Do not log the password')
    id.value = user.id
    username.value = user.username
    role.value = user.role
    email.value = user.email
    token.value = user.token
    isLoggedIn.value = true
    photo.value = user.photo
    isLoading.value = false

    // wait for backend to process file
    setTimeout(() => {
      lastUpdated.value = Date.now().toString()
    }, 500)
    return
  }

  // clear user
  const clearUser = () => {
    id.value = ''
    username.value = ''
    role.value = ''
    email.value = ''
    token.value = ''
    isLoggedIn.value = false
    photo.value = null
    isLoading.value = false
  }

  // register
  const register = async (request) => {
    isLoading.value = true
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
    finally {
      isLoading.value = false
    }
  }

  // login
  const login = async (request) => {
    isLoading.value = true
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
      userError.value = "Login mislukt. Controleer je gegevens en probeer het opnieuw.";
    }
    finally {
      isLoading.value = false
    }
  };

  // update password
  const updatePassword = async (request: IUpdatePasswordRequest) => {
    isLoading.value = true
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
    } finally {
      isLoading.value = false
    }
  }

  // reset password
  const resetPassword = async (request: IUpdatePasswordRequest) => {
    isLoading.value = true
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
    } finally {
      isLoading.value = false
    }
  }

  // check token
  const checkToken = async () => {
    isLoading.value = true
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
    } finally {
      isLoading.value = false
    }
  };


  // send reset password
  const sendResetPassword = async (email: string) => {
    isLoading.value = true
    try {
      const response: any = await $fetch(`${backendUrl}/users/forgotPassword`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email })
      });
      userModalState.value = 'forgotConfirm'
      isLoading.value = false
    } catch (error) {
      console.error('Error sending reset password:', error);
    } finally {
      isLoading.value = false
    }
  }

  // log out
  const logOut = async () => {
    isLoading.value = true
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
    } finally {
      isLoading.value = false
    }
  };

  // update user
  const updateMe = async (request) => {
    isLoading.value = true
    // construction of form data is needed to send a file
    const formData = new FormData()
    if (request.file) formData.append('photo', request.file)
    formData.append('username', request.username || username.value)
    formData.append('email', request.email || email.value)
    try {
      const response: IUserResponse = await $fetch(`${backendUrl}/users/updateMe`, {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: formData
      });

      await setUser(response.data.user)
      userModalState.value = 'editConfirm'

    } catch (error) {
      userError.value = "Er ging iets mis bij het updaten van je gegevens. Probeer het opnieuw.";
    } finally {
      isLoading.value = false
    }
  }

  // update user
  const deleteAccount = async () => {
    isLoading.value = true
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
    } finally {
      isLoading.value = false
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
    isLoading,
    lastUpdated,
    photoPath,
    useDarkmode,
    toggleDarkmode,
    getUsers,
    login,
    register,
    setUser,
    updatePassword,
    checkToken,
    logOut,
    sendResetPassword,
    updateMe,
    deleteAccount,
    setDarkmode
  }
})
