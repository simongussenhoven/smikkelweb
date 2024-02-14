import { defineStore } from 'pinia';
const baseURL = 'http://localhost:'
const backendPort = process.env.BACKEND_PORT || 3001

const useServiceStore = defineStore('serviceStore', () => {
  const checkApi = async () => {
    const dataTwice = await $fetch(`${baseURL}${backendPort}`)
    return dataTwice
  }
  return { checkApi }
})

export default useServiceStore