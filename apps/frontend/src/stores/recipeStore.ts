import { useRequestHeaders, useRuntimeConfig } from 'nuxt/app';
import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useRecipeStore = defineStore('recipeStore', () => {
  // nuxt stuff
  const { apiBase } = useRuntimeConfig().public;
  const headers = useRequestHeaders(['cookie', 'content-type', 'accept', 'authorization'])

  // state
  const isModalVisible = ref(false);
  const recipeModalState = ref('add')
  const recipeError = ref('');


  const addRecipe = async (request) => {
    try {
      const response = await $fetch(`${apiBase}/api/v1/recipes`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(request)
      })
      console.log(response)
    }
    catch (e: any) {
      recipeError.value = "Er ging iets mis bij het aanmaken. Probeer het opnieuw."
    }
  }

  return { isModalVisible, recipeModalState, recipeError, addRecipe }
})
