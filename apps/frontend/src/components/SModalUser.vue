<template>
  <div id="authentication-modal" data-modal-target="authentication-modal" tabindex="-1" aria-hidden="true"
    :class="{ hidden: !isModalVisible }"
    class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ modalTitle }}
          </h3>

          <button type="button"
            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal" @click="userStore.isModalVisible = false">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <SModalLoginBody v-if="userStore.userModalState === 'login'" />
        <SModalCreateBody v-if="userStore.userModalState === 'register'" />
        <SModalResetBody v-if="userStore.userModalState === 'reset'" />
        <SModalForgotPassword v-if="userStore.userModalState === 'forgot'" />
        <SModalForgotPassword v-if="userStore.userModalState === 'reset'" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '../stores/userStore'
import { computed } from 'vue';
const userStore = useUserStore();
const isModalVisible = computed(() => userStore.isModalVisible)
const modalTitle = computed(() => {
  if (userStore.userModalState === 'login') {
    return 'Log in op Smikkelweb'
  }
  if (userStore.userModalState === 'register') {
    return 'Maak een account aan'
  }
  if (userStore.userModalState === 'reset') {
    return 'Reset wachthwoord'
  }
  if (userStore.userModalState === 'forgot') {
    return 'Wachtwoord vergeten'
  }
})
</script>

<style lang="scss" scoped>
#authentication-modal {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>