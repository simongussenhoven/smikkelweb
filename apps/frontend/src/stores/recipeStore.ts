import { defineStore } from 'pinia';
import { get, post } from '@/api'
interface State {
  recipes: any[];
}

export const useRecipeStore = defineStore('recipes', {
  state: (): State => ({
    recipes: []
  }),
  getters: {
  },
  actions: {
    async getRecipes() {
      try {
        const response = await getRecipes();
        this.recipes = response.recipes
      }
      catch (error) {
        console.log(error)
      }
    }
  },
});
