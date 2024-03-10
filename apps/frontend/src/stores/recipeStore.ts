import { useRequestHeaders, useRuntimeConfig } from 'nuxt/app';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IRecipe } from 'types'


export const useRecipeStore = defineStore('recipeStore', () => {
  // nuxt stuff
  const { apiBase } = useRuntimeConfig().public;
  const backedUrl = process.env.NODE_ENV === 'development' ? `${apiBase}/api/v1` : '/api/v1'
  const headers = useRequestHeaders(['cookie', 'content-type', 'accept', 'authorization'])

  // state
  const isModalVisible = ref(false);
  const recipeModalState = ref('add')
  const recipeError = ref('');
  const recipes = ref<IRecipe[]>([]);
  const recipe = ref<IRecipe>(null)

  const getRecipeById = async (id: string) => {
    try {
      const response = await $fetch(`${backedUrl}/recipes/${id}`, {
        method: 'GET',
        headers,
      })
      //@ts-expect-error: fix types
      recipe.value = response.data.recipe
    }
    catch (e: any) {
      recipeError.value = "Er ging iets mis bij het ophalen van het recept. Probeer het opnieuw."
    }
  }

  const getRecipes = async () => {
    try {
      const response = await $fetch(`${backedUrl}/recipes`, {
        method: 'GET',
        headers,
      })

      //@ts-expect-error: fix types
      recipes.value = response.data.recipes
    }
    catch (e: any) {
      recipeError.value = "Er ging iets mis bij het ophalen van de recepten. Probeer het opnieuw."
    }
  }

  const addRecipe = async (request) => {
    try {
      const response = await $fetch(`${backedUrl}/recipes`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(request)
      })
    }
    catch (e: any) {
      recipeError.value = "Er ging iets mis bij het aanmaken. Probeer het opnieuw."
    }
  }

  return { isModalVisible, recipeModalState, recipeError, recipes, recipe, getRecipes, addRecipe, getRecipeById }
})
