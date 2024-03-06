<template>
  <div v-if="!recipe" class="flex items-center justify-center h-screen p-4">
    <div class="text-2xl font-bold text-center">Loading...</div>
  </div>
  <div v-else class="max-w-screen-xl flex flex-col justify-between mx-auto p-4">
    <div class="container mx-auto p- bg-slate-900 rounded p-6">
      <h1 class="title mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
        {{ recipe.title }}
      </h1>
      <div class="lg:flex">
        <div class="lg:w-1/4">
          <div class="bg-dark p-4 rounded shadow">
            <h2 class="text-xl font-bold mb-2">Benodigdheden</h2>
            <ul class="list-disc pl-4">
              <li v-for="req in recipe.requirements">{{ req.name }}</li>
            </ul>
          </div>
        </div>
        <div class="lg:w-2/4 mt-4 lg:mt-0">
          <div class="bg-dark p-4 rounded shadow">
            <h2 class="text-xl font-bold mb-2">Over dit recept</h2>
            <p>{{ recipe.description }}</p>
            <div class="bg-dark mt-4 rounded shadow mb-4">
              <h2 class="text-xl font-bold mb-2">Ingredients</h2>
              <ul class="list-disc pl-4">
                <li v-for="ing in recipe.ingredients">{{ `${ing.amount} ${ing.unit} ${ing.name.toLowerCase()}` }}</li>
              </ul>
            </div>
          </div>
          <div class="bg-dark p-4 pt-0 rounded shadow">
            <h2 class="text-xl font-bold mb-2">Instructies</h2>
            <ul class="list-disc pl-4">
              <li v-for="step in recipe.steps"> {{ step.description }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useRecipeStore } from '../../stores/recipeStore'
import { IRecipe } from '@types'
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const recipeStore = useRecipeStore();
const route = useRoute();

onMounted(() => {
  recipeStore.getRecipeById(String(route.params.id));
})

const recipe = computed(() => recipeStore.recipe)

</script>