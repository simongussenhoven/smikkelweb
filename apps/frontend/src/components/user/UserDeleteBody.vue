<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4">
      <div>
        <p>Je staat op het punt om je account te verwijderen. Je hebt hierna geen toegang meer tot je account en je
          recepten. Weet je het zeker?</p>

      </div>
      <span class="text-sm text-red-500 pt-5">{{ userStore.loginError }}</span>

      <div class="flex flex-col gap-2">
        <fwb-button size="md" color="default" @click.prevent="onClickOk">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Ja, verwijder mijn account voor altijd</span>
        </fwb-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { FwbButton, FwbSpinner } from 'flowbite-vue';
import { ref } from 'vue'
import { useUserStore } from '../../stores/userStore';
const userStore = useUserStore();

const isLoading = ref(false);

const onClickOk = () => {
  userStore.deleteAccount();
}
</script>