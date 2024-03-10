<template>
  <div class="max-w-screen-xl flex flex-col justify-between mx-auto p-4 recipe-container">
    <h1 class="title mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-dark dark:text-white">
      Recepten
    </h1>
    <div class="recipes flex flex-wrap gap-3">
      <SCard v-for="recipe in recipeStore.recipes" :key="recipe" :title="recipe.title"
        :description="recipe.description" :id="recipe._id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRecipeStore } from '../../stores/recipeStore';

const recipeStore = useRecipeStore();

onMounted(() => {
  recipeStore.getRecipes();
});
</script>
<style lang="scss" scoped>
  .recipe-container {
    flex-grow: 1;
    justify-content: flex-start;
  }
  .recipes {
    justify-content: center;
  }
</style>