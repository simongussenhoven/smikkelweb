<template>
  <div class="app">
    <SModalLoginCreate />
    <SNavbar />
    <NuxtPage />
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useUserStore } from './stores/userStore'
import useServiceStore from './stores/serviceStore';

onMounted(async () => {
  initFlowbite();
  await serviceStore.checkApi().then((response) => {
    console.log(response.message)
  });
})
const serviceStore = useServiceStore()
const userStore = useUserStore();

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