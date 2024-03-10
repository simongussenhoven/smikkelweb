<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4">
      <div>
        {{ confirmText }}
      </div>
      <span class="text-sm text-red-500 pt-5">{{ userStore.userError }}</span>

      <div class="flex flex-col gap-2">
        <fwb-button size="md" color="default" @click.stop="onClickOk">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Ok</span>
        </fwb-button>
        <fwb-button v-if="userStore.userModalState === 'logoutConfirm' || 'loginConfirm'"
          class="flex grow justify-center text-center" size="md" color="green" @click.stop="onClickButton">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>{{ buttonText }}</span>
        </fwb-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { FwbButton, FwbSpinner } from 'flowbite-vue';
import { computed, ref } from 'vue'
import { useUserStore } from '../../stores/userStore';
import { useRouter } from 'vue-router';
const userStore = useUserStore();

const isLoading = ref(false);

const onClickOk = () => {
  userStore.isModalVisible = false
  userStore.userModalState = 'login'
}

const router = useRouter()
const onClickButton = () => {
  if (userStore.userModalState === 'logoutConfirm') {
    userStore.userModalState = 'login'
  } else if (userStore.userModalState === 'loginConfirm') {
    router.push('/profiel')
  }
}

const buttonText = computed(() => {
  switch (userStore.userModalState) {
    case 'logoutConfirm':
      return 'Opnieuw inloggen'
    case 'loginConfirm':
      return 'Naar mijn profiel'
    default:
      return ''
  }

})

const confirmText = (computed(() => {
  switch (userStore.userModalState) {
    case 'logoutConfirm':
      return 'Je bent nu uitgelogd.'
    case 'registerConfirm':
      return 'Je account is aangemaakt.'
    case 'resetConfirm':
      return 'Je wachtwoord is gewijzigd.'
    case 'forgotConfirm':
      return 'Als je account bestaat, is er een email gestuurd naar het adres dat bij ons bekend is. Controleer je email om je wachtwoord te resetten.'
    case 'editConfirm':
      return 'Je gegevens zijn aangepast.'
    case 'deleteConfirm':
      return 'Je account is verwijderd.'
    case 'loginConfirm':
      return 'Je bent nu ingelogd.'
    default:
      return ''
  }
}))
</script>