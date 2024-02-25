import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useServiceStore = defineStore('counter', () => {
  //@ts-expect-error nuxt types
  const { apiBase } = useRuntimeConfig().public;

  const checkApi = async () => {
    if (!apiBase) {
      console.log('No API base found')
      return
    }
    try {
      //@ts-expect-error nuxt types
      const response = await $fetch(apiBase)
    }
    catch (e) {
      console.error('API check failed', e)
    }

  }

  return { checkApi }
})