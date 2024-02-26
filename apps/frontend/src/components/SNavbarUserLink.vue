<template>
  <li>
    <nuxt-link :href="link ?? ''" @click="role === 'logout' ? userStore.logOut : ''"
      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
      {{ title }}
    </nuxt-link>
  </li>
</template>
<script setup lang="ts">
import { useUserStore } from '../stores/userStore'

const props = defineProps<{
  title: string
  link?: string
  role?: string
}>()

const userStore = useUserStore()
</script>