<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">
      <div>
        <label for="passwordCurrent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Huidig
          wachtwoord</label>
        <input id="passwordCurrent" v-model="passwordCurrent" type="password" name="passwordCurrent"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required>
      </div>
      <div>
        <label for="newPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nieuw
          wachtwoord</label>
        <input id="newPassword" v-model="password" type="password" name="newPassword" placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required>
      </div>
      <div>
        <label for="passwordConfirm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nieuw wachtwoord
          herhalen</label>
        <input id="passwordConfirm" v-model="passwordConfirm" type="password" name="passwordConfirm"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required>
      </div>
      <span class="text-sm text-red-500 pt-5">{{ userStore.loginError }}</span>
      <!-- login button -->
      <div class="flex mt-4" @click="onClickLogin">
        <fwb-button class="flex grow justify-center text-center" size="md" color="default">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Wachtwoord wijzigen</span>
        </fwb-button>
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

const passwordCurrent = ref('')
const password = ref('')
const passwordConfirm = ref('')
const isModalVisible = computed(() => userStore.isModalVisible)

const isLoading = ref(false)
watch(isModalVisible, () => {
  userStore.loginError = ''
})

const onClickLogin = async (e: any) => {
  e.preventDefault();
  if (password.value !== passwordConfirm.value) {
    userStore.loginError = 'Wachtwoorden komen niet overeen'
    return
  }
  // do the call from store
  isLoading.value = true
  await userStore.updatePassword({
    passwordCurrent: passwordCurrent.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value
  })
  isLoading.value = false
}
</script>