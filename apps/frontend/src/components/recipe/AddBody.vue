<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">
      <div>
        <FwbInput v-model="recipeModel.title" type="text" name="title" placeholder="Recept naam" label="Naam" required />
      </div>
      <div>
        <FwbTextarea v-model="recipeModel.description" name="description" placeholder="Recept beschrijving"
          label="Omschrijving" required />
      </div>
      <div>
        <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredienten</span>
        <div class="flex gap-2 mb-2" v-for="(ing, i) in recipeModel.ingredients">
          <FwbInput class="w-20" v-model="ing.unit" type="number" name="unit" placeholder="Aantal" required />
          <FwbInput class="grow" v-model="ing.name" type="text" name="ingredient" placeholder="Ingredient" required />
          <FwbButton class="flex justify-center text-center" size="md" :color="getColor(IInputType.ING, i)"
            @click.prevent="onClickButton(IInputType.ING, i)">
            <Icon :name="getIcon(IInputType.ING, i)" />
          </FwbButton>
        </div>
      </div>
      <div>
        <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stappen</span>
        <div class="flex gap-2 mb-2" v-for="(step, i) in recipeModel.steps">
          <FwbInput class="grow" v-model="step.description" type="text" name="step" placeholder="Stap" required />
          <FwbButton class="flex justify-center text-center" size="md" :color="getColor(IInputType.STEP, i)"
            @click.prevent="onClickButton(IInputType.STEP, i)">
            <Icon :name="getIcon(IInputType.STEP, i)" />
          </FwbButton>
        </div>
      </div>
      <span class="text-sm text-red-500 pt-5">{{ recipeStore.error }}</span>
      <div class="flex">
        <fwb-button class="flex grow justify-center text-center" size="md" color="default">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Recept aanmaken</span>
        </fwb-button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { FwbSpinner, FwbInput, FwbTextarea, FwbDropdown, FwbButton } from 'flowbite-vue';
import { useRecipeStore } from '../../stores/recipeStore';

enum IInputType {
  ING = 1,
  STEP = 2
}

const recipeStore = useRecipeStore();
const isLoading = ref(false)

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

const recipeModel = ref({
  title: '',
  description: '',
  category: '',
  ingredients: [{ unit: '', name: '', amount: '' }],
  steps: [{ description: '' }],
  image: '',
})

const category = ref({ value: 'dinner', label: 'Diner' })
const categories = ref([
  { value: 'breakfast', label: 'Ontbijt' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Diner' },
  { value: 'snack', label: 'Snack' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'drink', label: 'Drinken' },
])

const getIcon = (type: IInputType, index: number) => {
  if (type === IInputType.ING) {
    return index === recipeModel.value.ingredients.length - 1 ? 'flowbite:plus-outline' : 'flowbite:minus-outline'
  }
  return index === recipeModel.value.steps.length - 1 ? 'flowbite:plus-outline' : 'flowbite:minus-outline'
}

const getColor = (type: IInputType, index: number) => {
  const arr = type === IInputType.ING ? recipeModel.value.ingredients : recipeModel.value.steps
  return index === arr.length - 1 ? 'green' : 'dark'
}

const addIngredient = () => {
  recipeModel.value.ingredients.push({ unit: '', name: '', amount: '' })
}

const removeIngredient = (index: number) => {
  recipeModel.value.ingredients = recipeModel.value.ingredients.filter((_, i) => i !== index)
}

const addStep = () => {
  recipeModel.value.steps.push({ description: '' })
}

const removeStep = (index: number) => {
  recipeModel.value.steps = recipeModel.value.steps.filter((_, i) => i !== index)
}

const onClickButton = (type: IInputType, index: number) => {
  if (type === IInputType.ING) {
    index === recipeModel.value.ingredients.length - 1 ? addIngredient() : removeIngredient(index)
    return
  }
  index === recipeModel.value.steps.length - 1 ? addStep() : removeStep(index)
}

</script>