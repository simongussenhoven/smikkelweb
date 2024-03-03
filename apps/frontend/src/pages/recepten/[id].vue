<template>
  <div class="max-w-screen-xl flex flex-col justify-between mx-auto p-4">
    <!-- 
    <img src="../docs/images/recipes/placeholder.jpg" alt="">
    
    <div clss="requirements">
      <h4 class="my-2">Benodigdheden</h4>
      <div class="flex flex-row">
        <span v-for="(req, index) in recipe?.requirements">{{ req.amount }} {{ req.name }}{{ index <
        recipe?.requirements.length ? "," : "" }} </span>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="recipe flex flex-row gap-10">
        <div class="Ingredients">
          <h4 class="my-2">Ingrediënten</h4>
          <ul>
            <li v-for="ingredient in recipe?.ingredients" :key="ingredient.id">
              {{ ingredient.amount }}
              {{ ingredient.unit === "Stuk" ? "" : ingredient.unit + "" }}
              {{ ingredient.name }}</li>
          </ul>
        </div>
        <div class="steps">
          <h4 class="my-2">Bereidingswijze</h4>
          <ol>
            <li v-for="(step, index) in recipe?.steps" :key="step.id">Stap{{ index + 1 }}: {{ step.description }}</li>
          </ol>
        </div>
      </div>
    </div> -->
  </div>
  <div class="container mx-auto p-4">

    <!-- Recipe Title -->
    <h1 class="title mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
      {{ recipe?.title }}

    </h1>

    <!-- Layout for Mobile -->
    <div class="lg:flex">

      <!-- Left Column - Pots and Pans Section -->
      <div class="lg:w-1/4">
        <div class="bg-dark p-4 rounded shadow">
          <h2 class="text-xl font-bold mb-2">Pots and Pans</h2>
          <ul class="list-disc pl-4">
            <li>Pot 1</li>
            <li>Pan 1</li>
            <!-- Add more items as needed -->
          </ul>
        </div>
      </div>

      <!-- Right Column - Ingredients and Instructions Section -->
      <div class="lg:w-2/4 mt-4 lg:mt-0">
        <p>{{ recipe?.description }}</p>
        <!-- Ingredients Section -->
        <div class="bg-dark p-4 rounded shadow mb-4">
          <h2 class="text-xl font-bold mb-2">Ingredients</h2>
          <ul class="list-disc pl-4">
            <li>Ingredient 1</li>
            <li>Ingredient 2</li>
            <!-- Add more items as needed -->
          </ul>
        </div>

        <!-- Instructions Section -->
        <div class="bg-dark p-4 rounded shadow">
          <h2 class="text-xl font-bold mb-2">Instructions</h2>
          <ol class="list-decimal pl-4">
            <li>Step 1: Instruction 1</li>
            <li>Step 2: Instruction 2</li>
            <!-- Add more steps as needed -->
          </ol>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useRecipeStore } from '../../stores/recipeStore'
const recipeStore = useRecipeStore();
const route = useRoute();

const recipe = recipeStore.recipes.find((recipe) => recipe._id === route.params.id);

</script>