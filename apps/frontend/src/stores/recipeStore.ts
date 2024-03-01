import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useRecipeStore = defineStore('recipeStore', () => {
  const isModalVisible = ref(false);
  const recipeModalState = ref('add')
  const error = ref(null);

  const addRecipe = (recipe) => {
    console.log('recipe', recipe)
  }

  return { isModalVisible, recipeModalState, error, addRecipe }
})
