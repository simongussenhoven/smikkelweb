<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">

      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input id="email" v-model="email" type="email" name="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com" required>
      </div>

      <div class="flex">
        <fwb-button class="flex grow justify-center text-center" size="md" color="default"
          @click.stop="state === 'ready' ? onClickSend : onClickOk">
          <fwb-spinner v-if="isLoading" color="gray" />
          {{ state === 'ready' ? 'Verstuur link' : 'Ok' }}
        </fwb-button>
      </div>

    </form>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '../stores/userStore';
import { ref } from 'vue';
import { FwbButton, FwbSpinner } from 'flowbite-vue';
const userStore = useUserStore();
const email = ref('')
const state = ref('ready')

const isLoading = ref(false)
const onClickSend = async (e) => {
  e.preventDefault();
  isLoading.value = true
  userStore.loginError = ''
  await userStore.sendResetPassword(email.value);
  isLoading.value = false

}

const onClickOk = (e) => {
  e.preventDefault();
  userStore.isModalVisible = false
  userStore.userModalState = 'login'
}
</script>