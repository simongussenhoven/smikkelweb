<template>
  <div :class="colorClass" class="app">
    <div class="app-container bg-slate-200 dark:bg-slate-800">
      <UserModal />
      <RecipeModal />
      <SNavbar/>
      <NuxtPage />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useServiceStore } from './stores/serviceStore'
import { useUserStore } from './stores/userStore';

const serviceStore = useServiceStore()
serviceStore.checkApi()
const userStore = useUserStore()
onMounted(async () => {
  initFlowbite();
  userStore.checkToken()
})
const colorClass = computed(() => {
  return userStore.useDarkmode ? 'dark' : 'light'
})

</script>
<style>
@import '~/assets/css/main.css';
</style>
<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  
}
.app-container {
  flex-grow: 1;
  display:flex;
  flex-direction: column;
}
</style>