import { defineStore } from 'pinia';
const baseURL = 'http://localhost:'
const backendPort = process.env.BACKEND_PORT

const useServiceStore = defineStore('serviceStore', () => {
  console.info(`Using environment: ${process.env.NODE_ENV}`)
  console.info(`Using backend port: ${backendPort}`)
  const checkApi = async () => {
    const dataTwice = await $fetch(`${baseURL}${backendPort}`)
    return dataTwice
  }
  return { checkApi }
})

export default useServiceStore