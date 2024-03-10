<template>
  <div v-if="!recipe" class="flex items-center justify-center h-screen p-4">
    <fwb-spinner spinner-size="10"/>
  </div>
  <div v-else class="max-w-screen-xl flex flex-col justify-between mx-auto p-4">
    <div class="container mx-auto rounded p-6">
      <h1 class="title mb-4 text-4xl font-extrabold tracking-tight leading-none text-dark dark:text-white md:text-5xl lg:text-6xl pb-5 ">
        {{ recipe.title }}
      </h1>
      <div class="lg:flex gap-4">
        <div class="lg:w-1/4 flex flex-col gap-4">
          <div class="bg-dark p-4 rounded shadow bg-white dark:bg-gray-700 text-dark dark:text-white ">
            <h2 class="text-xl font-bold mb-2">Benodigdheden</h2>
            <ul class="list-disc pl-4">
              <li v-for="req in recipe.requirements">{{ req.name }}</li>
            </ul>
          </div>
          <div class="bg-dark p-4 rounded shadow bg-white dark:bg-gray-700 text-dark dark:text-white">
            <h2 class="text-xl font-bold mb-2">Ingredienten</h2>
            <ul class="list-disc pl-4">
              <li v-for="ing in recipe.ingredients">{{ `${ing.amount} ${ing.unit} ${ing.name.toLowerCase()}` }}</li>
            </ul>
          </div>
        </div>
        <div class="lg:w-3/4 mt-4 lg:mt-0 flex flex-col gap-4">
          <div class="bg-dark p-4 rounded shadow bg-white dark:bg-gray-700 text-dark dark:text-white">
            <h2 class="text-xl font-bold mb-2">Over dit recept</h2>
            <p>{{ recipe.description }}</p>
          </div>
          <!-- <div class="bg-dark p-4 rounded shadow bg-white">
            <h2 class="text-xl font-bold mb-2">Ingredienten</h2>
            <ul class="list-disc pl-4">
              <li v-for="ing in recipe.ingredients">{{ `${ing.amount} ${ing.unit} ${ing.name.toLowerCase()}` }}</li>
            </ul>
          </div> -->

          <div class="bg-dark p-4 rounded shadow bg-white dark:bg-gray-700 text-dark dark:text-white">
            <h2 class="text-xl font-bold mb-2">Ingredienten</h2>
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
import { computed, onMounted } from 'vue';
import { FwbSpinner } from 'flowbite-vue';
const recipeStore = useRecipeStore();
const route = useRoute();

onMounted(() => {
  recipeStore.getRecipeById(String(route.params.id));
})
const recipe = computed(() => recipeStore.recipe)

</script>