import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useRecipeStore = defineStore('recipeStore', () => {
  const isModalVisible = ref(false);
  const recipeModalState = ref('add')
  const error = ref(null);
  return { isModalVisible, recipeModalState, error }
})
