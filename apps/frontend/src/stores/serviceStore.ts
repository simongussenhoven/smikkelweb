import { useRuntimeConfig } from 'nuxt/app';
import { defineStore } from 'pinia'

export const useServiceStore = defineStore('serviceStore', () => {
  const { apiBase } = useRuntimeConfig().public;
  console.log(`Running ${process.env.NODE_ENV}`)

  const backendUrl = process.env.NODE_ENV === 'development' ? apiBase : '/api'

  const checkApi = async () => {
    if (!apiBase) {
      console.log('No API base found')
      return
    }
    try {
      const response = await $fetch(backendUrl as string)
    }
    catch (e) {
      console.error('API check failed', e)
    }
  }
  return { checkApi }
})