import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useServiceStore = defineStore('counter', () => {
  //@ts-expect-error: nuxt types
  const { apiBase } = useRuntimeConfig().public;

  const checkApi = async () => {
    if (!apiBase) {
      console.log('No API base found')
      return
    }
    //@ts-expect-error: nuxt types
    const response = await $fetch(apiBase)
    if (!response.ok) {
      console.log('API not available')
      return
    }
  }

  return { checkApi }
})