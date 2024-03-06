import { useRuntimeConfig } from 'nuxt/app';
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useServiceStore = defineStore('serviceStore', () => {
  const { apiBase } = useRuntimeConfig().public;
  const backendUrl = process.env.NODE_ENV === 'development' ? apiBase : '/api'
  const checkApi = async () => {
    if (!apiBase) {
      console.log('No API base found')
      return
    }
    try {
      const response = await $fetch(apiBase as string)
    }
    catch (e) {
      console.error('API check failed', e)
    }

  }

  return { checkApi }
})