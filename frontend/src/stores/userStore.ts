import { defineStore } from 'pinia';
import { login, register } from '@/api';
import type { INewUserRequest, ILoginRequest } from '~/types/users';
import { get, post } from '@/api'

interface IUserResponse {
  status: 'success' | 'error';
  user: {
    id: string;
    name: string;
    email: string;
    token: string;
  }
}

interface State {
  loginVisible: boolean;
  user: {
    name: string;
    email: string;
    isLoggedIn: boolean;
    token: string;
  }
  loginError: string;
  userModalState: 'login' | 'register';
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    loginVisible: false,
    user: {
      name: '',
      email: '',
      isLoggedIn: false,
      token: '',
    },
    loginError: '',
    userModalState: 'login',
  }),
  getters: {
    fullName(state: State) {
      return `${state.user.name}`;
    },
  },
  actions: {
    async login(request: ILoginRequest) {
      try {
        const endpoint = '/api/v1/users/login';
        const response = await post(endpoint, request);
        this.setUser(response)
      } catch (error) {
        console.error('Error posting data:', error);
      }
    },
    async register(request: INewUserRequest) {
      console.log('register')
    },
    logout() {
      console.log('logout')
      this.user.isLoggedIn = false;
    },
    setUser(response: IUserResponse) {
      this.user.name = response.user.name;
      this.user.email = response.user.email;
      this.user.token = response.user.token;
      this.user.isLoggedIn = true;
      this.loginVisible = false;
    }
  },
});
