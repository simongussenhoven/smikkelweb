<template>
  Admin page
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/userStore'
import { computed, onMounted } from 'vue';
const userStore = useUserStore();
onMounted(() => {
  userStore.getUsers();
})
</script>