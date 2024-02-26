<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">
      <p>{{ introText }}</p>
      <div v-if="state === 'ready'">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input id="email" v-model="email" type="email" name="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="naam@voorbeeld.nl" required>
        <span class="text-sm text-red-500 pt-5">{{ userStore.loginError }}</span>
      </div>

      <div class="flex">
        <fwb-button class="flex grow justify-center text-center" size="md" color="default" @click="onClickButton">
          <fwb-spinner v-if="isLoading" color="white" />
          <span v-else>{{ state === 'ready' ? 'Verstuur link' : 'Ok' }}</span>
        </fwb-button>
      </div>

    </form>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '../stores/userStore';
import { ref, watch, computed } from 'vue';
import { FwbButton, FwbSpinner } from 'flowbite-vue';
import { isEmail } from '../../utils'

type IMailSendState = 'ready' | 'sent'

const userStore = useUserStore();
const email = ref('')
const state = ref<IMailSendState>('ready')
const isLoading = ref(false)

watch(email, () => {
  userStore.loginError = ''
})

const introText = computed(() => {
  if (state.value === 'ready') {
    return 'Vul je emailadres in om een link te ontvangen waarmee je je wachtwoord kunt resetten.'
  } else {
    return 'Er is een email verstuurd naar ' + email.value + ' met een link om je wachtwoord te resetten.'
  }
})

const onClickButton = async (e) => {
  e.preventDefault();
  if (state.value === 'ready') {
    if (!isEmail(email.value)) {
      userStore.loginError = 'Ongeldig emailadres'
      return
    }
    isLoading.value = true
    await userStore.sendResetPassword(email.value);
    state.value = 'sent'
    isLoading.value = false
    return
  } else {
    userStore.isModalVisible = false
    userStore.userModalState = 'login'
  }
}
</script>