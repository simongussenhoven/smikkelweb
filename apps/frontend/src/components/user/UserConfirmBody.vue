<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">
      <div>
        {{ confirmText }}
      </div>
      <span class="text-sm text-red-500 pt-5">{{ userStore.loginError }}</span>

      <div class="flex flex-col gap-2">
        <fwb-button size="md" color="default" @click.stop="onClickOk">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Ok</span>
        </fwb-button>
        <fwb-button v-if="userStore.userModalState === 'logoutConfirm'" class="flex grow justify-center text-center"
          size="md" color="green" @click.stop="onClickLogin">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Opnieuw inloggen</span>
        </fwb-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { FwbButton, FwbSpinner } from 'flowbite-vue';
import { computed, ref } from 'vue'
import { useUserStore } from '../../stores/userStore';
const userStore = useUserStore();

const isLoading = ref(false);

const onClickOk = () => {
  userStore.isModalVisible = false
  userStore.userModalState = 'login'
}

const onClickLogin = () => {
  userStore.userModalState = 'login'
}

const confirmText = (computed(() => {
  switch (userStore.userModalState) {
    case 'logoutConfirm':
      return 'Je bent nu uitgelogd.'
    case 'registerConfirm':
      return 'Je account is aangemaakt.'
    case 'resetConfirm':
      return 'Je wachtwoord is gereset.'
    case 'forgotConfirm':
      return 'Je wachtwoord is gereset.'
    case 'editConfirm':
      return 'Je gegevens zijn aangepast.'
    default:
      return ''
  }
}))
</script>