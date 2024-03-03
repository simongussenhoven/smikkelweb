<template>
  <SModal v-model="isModalVisible">
    <template #title>
      {{ modalTitle }}
    </template>

    <template #body>
      <UserLoginBody v-if="userStore.userModalState === 'login'" />
      <UserCreateBody v-if="userStore.userModalState === 'register'" />
      <UserResetBody v-if="userStore.userModalState === 'reset'" />
      <UserForgotBody v-if="userStore.userModalState === 'forgot'" />
      <UserCreateTermsBody v-if="userStore.userModalState === 'terms'" />
      <UserEditBody v-if="userStore.userModalState === 'edit'" />
      <UserConfirmBody v-if="userStore.userModalState.toLowerCase().includes('confirm')" />
    </template>

  </SModal>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/userStore'
import { computed } from 'vue';
const userStore = useUserStore();

const isModalVisible = computed({
  get: () => userStore.isModalVisible,
  set: (value) => userStore.isModalVisible = value
})

const modalTitle = computed(() => {
  switch (userStore.userModalState) {
    case 'login':
      return 'Log in op Smikkelweb'
    case 'register':
      return 'Maak een account aan'
    case 'reset':
      return 'Reset wachtwoord'
    case 'forgot':
      return 'Wachtwoord vergeten'
    case 'logoutConfirm':
      return 'Uitgelogd'
    case 'terms':
      return 'Algemene voorwaarden'
    case 'edit':
      return 'Gegevens aanpassen'
    default:
      return 'Smikkelweb'
  }
})

</script>

<style lang="scss" scoped>
#authentication-modal {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>