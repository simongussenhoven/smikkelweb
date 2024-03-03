<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">
      <div>
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Naam</label>
        <input id="username" v-model="username" type="text" name="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Gebruikersnaam" required>
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input id="email" v-model="email" type="email" name="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="naam@voorbeeld.nl" required>
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

      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input id="terms" v-model="acceptTerms" type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
        </div>
        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ik ga akkoord met de
          <a href="#" class="underline" @click.prevent="userStore.userModalState = 'terms'">algemene
            voorwaarden</a></label>
      </div>
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input id="remember" v-model="rememberMe" type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Onthoud mij</label>
      </div>

      <span class="text-sm text-red-500 pt-5">{{ userStore.loginError }}</span>

      <div class="flex">
        <fwb-button class="flex grow justify-center text-center" size="md" color="default"
          @click.stop="onClickRegister">
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
import { useUserStore } from '../../stores/userStore';
import { FwbButton } from 'flowbite-vue';
import { FwbSpinner } from 'flowbite-vue';
import { badUsernames } from '../../validators/badUsernames';

const userStore = useUserStore();
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const loginVisible = computed(() => userStore.isModalVisible)
const acceptTerms = ref(false);
const isDisabled = ref(false);
const isLoading = ref(false);
const rememberMe = ref(false);

watch(loginVisible, () => {
  userStore.loginError = ''
})

watch(username, () => {
  if (badUsernames.includes(username.value.toLowerCase())) {
    userStore.loginError = 'Deze gebruikersnaam is niet toegestaan';
    isDisabled.value = true;
  } else {
    userStore.loginError = '';
    isDisabled.value = false;
  }
})

const onClickRegister = async (e: any) => {
  e.preventDefault();
  if (isDisabled.value) return
  if (!acceptTerms.value) {
    userStore.loginError = 'Je moet akkoord gaan met de algemene voorwaarden';
    return;
  }
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