<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input id="email" v-model="email" type="email" name="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wachtwoord</label>
        <input id="password" v-model="password" type="password" name="password" placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required>
      </div>
      <span class="text-sm text-red-500 pt-5">{{ userStore.loginError }}</span>
      <!-- login options-->
      <div class="flex justify-between">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="remember" v-model="password" type="checkbox" value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
          </div>
          <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Onthoud
            mij</label>
        </div>
        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
      </div>
      <!-- login button -->
      <div class="flex mt-4">
        <fwb-button class="flex grow justify-center text-center" size="md" color="default" @click="onClickLogin">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Login</span>
        </fwb-button>
      </div>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        <span>Nog geen account?</span>
        <nuxt-link class="text-blue-700 hover:underline dark:text-blue-500 px-2"
          @click="userStore.userModalState = 'register'">
          Aanmaken
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '../stores/userStore';
import { FwbButton } from 'flowbite-vue';
import { FwbSpinner } from 'flowbite-vue';
import { ref, computed, watch } from 'vue';
const userStore = useUserStore();

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const isLoggedIn = computed(() => userStore.user.isLoggedIn)
const loginVisible = computed(() => userStore.loginVisible)

const isLoading = ref(false)
watch(loginVisible, () => {
  userStore.loginError = ''
})

const onClickLogin = async (e: any) => {
  e.preventDefault();
  if (!email.value || !password.value) {
    userStore.loginError = 'Vul a.u.b. alle velden in'
    return
  }
  // do the call from store
  isLoading.value = true
  await userStore.login({
    email: email.value,
    password: password.value,
  })
  isLoading.value = false
}
</script>