<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">
      <div>
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Naam</label>
        <input id="username" v-model="username" type="text" name="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Joost Smikkelson" required>
      </div>
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
      <div>
        <label for="passwordConfirm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wachtwoord
          bevestigen</label>
        <input id="passwordConfirm" v-model="passwordConfirm" type="password" name="passwordConfirm"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required>
      </div>
      <span class="text-sm text-red-500 pt-5">{{ userStore.loginError }}</span>

      <div class="flex">
        <fwb-button class="flex grow justify-center text-center" size="md" color="default" @click.stop="onClickRegister">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Account aanmaken</span>
        </fwb-button>
      </div>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        <nuxt-link class="text-blue-700 hover:underline dark:text-blue-500 px-2"
          @click="userStore.userModalState = 'login'">
          Terug naar login
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useUserStore } from '../stores/userStore';
import { FwbButton } from 'flowbite-vue';
import { FwbSpinner } from 'flowbite-vue';
const userStore = useUserStore();

const username = ref('smikkelson')
const email = ref('siem@siem.nl')
const password = ref('1234')
const passwordConfirm = ref('1234')
const isLoggedIn = computed(() => userStore.isLoggedIn)
const loginVisible = computed(() => userStore.isModalVisible)

const isLoading = ref(false)
watch(loginVisible, () => {
  userStore.loginError = ''
})

const onClickRegister = async (e: any) => {
  e.preventDefault();
  if (!email.value || !password.value || !username.value || !passwordConfirm.value) {
    userStore.loginError = 'Vul alle velden in';
    return;
  }
  isLoading.value = true;
  await userStore.register(
    {
      username: username.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    });
  isLoading.value = false;
}

</script>