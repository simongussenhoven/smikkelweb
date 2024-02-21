import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useServiceStore = defineStore('counter', () => {
  const { apiBase } = useRuntimeConfig().public;

  const checkApi = async () => {
    console.log(`Backend defined: ${apiBase}`)
    const response = await $fetch(apiBase)
    console.log(response)
  }

  return { checkApi }
})