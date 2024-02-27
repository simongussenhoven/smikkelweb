<template>
  <div class="app">
    <UserModal />
    <RecipeModal />
    <SNavbar />
    <NuxtPage />
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
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

</script>
<style>
@import '~/assets/css/main.css';
</style>
<style lang="scss" scoped>
.app {
  background-color: black;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
}
</style>