import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useServiceStore = defineStore('counter', () => {
  const { apiBase } = useRuntimeConfig().public;

  const checkApi = async () => {
    if (!apiBase) {
      console.log('No API base found')
      return
    }
    console.log('Checking API at ' + apiBase)
    const response = await $fetch(apiBase)

    console.log(response)
  }

  return { checkApi }
})