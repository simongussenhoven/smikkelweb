<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">
      <!-- name -->
      <div>
        <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <Icon name="flowbite:file-circle-plus-outline" />
          Naam
        </span>
        <FwbInput v-model="recipeModel.title" type="text" name="title" label="" placholder="Titel" required />
      </div>

      <!-- description -->
      <div>
        <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <Icon name="flowbite:annotation-outline" />
          Omschrijving
        </span>
        <FwbTextarea v-model="recipeModel.description" name="description" placeholder="Recept beschrijving" label=""
          required />
      </div>

      <!-- veggie options -->
      <div class="flex gap-3">
        <FwbCheckbox class="w-1/2" v-model="recipeModel.vegetarian" label="Vegetarisch" />
        <FwbCheckbox class="w-1/2" v-model="recipeModel.vegan" label="Vegan" />
      </div>

      <!-- settings -->
      <div class="flex gap-2">
        <div class="w-1/2">
          <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Aantal personen
          </span>
          <div class="flex items-center gap-2">
            <FwbButton color="dark" outline size="sm" @click.prevent="onClickCounter(CounterTypeEnum.SERVINGS, -1)">
              <Icon name="flowbite:minus-outline" />
            </FwbButton>
            <FwbInput class="w-14" v-model="recipeModel.servings" type="number" name="servings"
              placeholder="Aantal personen" label="" required />
            <FwbButton color="dark" outline size="sm" @click.prevent="onClickCounter(CounterTypeEnum.SERVINGS, 1)">
              <Icon name="flowbite:plus-outline" />
            </FwbButton>
          </div>
        </div>
        <div class="w-1/2">
          <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Bereidingstijd (min)
          </span>
          <div class="flex items-center gap-2">
            <FwbButton color="dark" outline size="sm" @click.prevent="onClickCounter(CounterTypeEnum.TIME, -1)">
              <Icon name="flowbite:minus-outline" />
            </FwbButton>
            <FwbInput class="w-14" v-model="recipeModel.time" type="number" name="time" placeholder="Tijd" label=""
              required />
            <FwbButton color="dark" outline size="sm" @click.prevent="onClickCounter(CounterTypeEnum.TIME, 1)">
              <Icon name="flowbite:plus-outline" />
            </FwbButton>
          </div>
        </div>
      </div>

      <!-- requirements -->
      <div>
        <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <Icon name="fluent-emoji-high-contrast:broccoli" />
          Benodigdheden
        </span>
        <div class="flex gap-2 mb-2" v-for="(req, i) in recipeModel.requirements">
          <FwbInput class="w-20" v-model="req.amount" type="number" name="unit" placeholder="Aantal" required />
          <FwbInput class="grow" v-model="req.name" type="text" name="ingredient" placeholder="Keukengerei" required />
          <FwbButton class="flex justify-center text-center" size="md" :color="getColor(InputTypeEnum.REQ, i)"
            @click.prevent="onClickButton(InputTypeEnum.REQ, i)">
            <Icon :name="getIcon(InputTypeEnum.REQ, i)" />
          </FwbButton>
        </div>
      </div>

      <!-- ingredients -->
      <div>
        <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <Icon name="fluent-emoji-high-contrast:broccoli" />
          Ingredienten
        </span>
        <div class="flex gap-2 mb-2" v-for="(ing, i) in recipeModel.ingredients">
          <FwbInput class="w-20" v-model="ing.unit" type="number" name="unit" placeholder="Aantal" required />
          <FwbInput class="grow" v-model="ing.name" type="text" name="ingredient" placeholder="Ingredient" required />
          <FwbButton class="flex justify-center text-center" size="md" :color="getColor(InputTypeEnum.ING, i)"
            @click.prevent="onClickButton(InputTypeEnum.ING, i)">
            <Icon :name="getIcon(InputTypeEnum.ING, i)" />
          </FwbButton>
        </div>
      </div>

      <!-- steps -->
      <div>
        <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <Icon name="flowbite:ordored-list-outline" />
          Stappen
        </span>
        <div class="flex gap-2 mb-2" v-for="(step, i) in recipeModel.steps">
          <FwbInput class="grow" v-model="step.description" type="text" name="step" placeholder="Stap" required />
          <FwbButton class="flex justify-center text-center" size="md" :color="getColor(InputTypeEnum.STEP, i)"
            @click.prevent="onClickButton(InputTypeEnum.STEP, i)">
            <Icon :name="getIcon(InputTypeEnum.STEP, i)" />
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
import { FwbSpinner, FwbInput, FwbTextarea, FwbCheckbox, FwbButton } from 'flowbite-vue';
import { useRecipeStore } from '../../stores/recipeStore';

enum InputTypeEnum {
  REQ = 1,
  ING = 2,
  STEP = 3
}

enum CounterTypeEnum {
  SERVINGS = 1,
  TIME = 2
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
  vegetarian: false,
  vegan: false,
  servings: 4,
  time: 30,
  category: '',
  requirements: [{ name: '', amount: '' }],
  ingredients: [{ unit: '', name: '', amount: '' }],
  steps: [{ description: '' }],
  image: '',
})

// const category = ref({ value: 'dinner', label: 'Diner' })
// const categories = ref([
//   { value: 'breakfast', label: 'Ontbijt' },
//   { value: 'lunch', label: 'Lunch' },
//   { value: 'dinner', label: 'Diner' },
//   { value: 'snack', label: 'Snack' },
//   { value: 'dessert', label: 'Dessert' },
//   { value: 'drink', label: 'Drinken' },
// ])

const getIcon = (type: InputTypeEnum, index: number) => {
  let arrLength = 0
  if (type === InputTypeEnum.REQ) arrLength = recipeModel.value.requirements.length
  if (type === InputTypeEnum.ING) arrLength = recipeModel.value.ingredients.length
  if (type === InputTypeEnum.STEP) arrLength = recipeModel.value.steps.length
  return index === arrLength - 1 ? 'flowbite:plus-outline' : 'flowbite:minus-outline'
}

const getColor = (type: InputTypeEnum, index: number) => {
  let arrLength = 0
  if (type === InputTypeEnum.REQ) arrLength = recipeModel.value.requirements.length
  if (type === InputTypeEnum.ING) arrLength = recipeModel.value.ingredients.length
  if (type === InputTypeEnum.STEP) arrLength = recipeModel.value.steps.length
  return index === arrLength - 1 ? 'green' : 'dark'
}

const addRequirement = () => {
  recipeModel.value.requirements.push({ name: '', amount: '' })
}

const removeRequirement = (index: number) => {
  recipeModel.value.requirements = recipeModel.value.requirements.filter((_, i) => i !== index)
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

const onClickButton = (type: InputTypeEnum, index: number) => {
  if (type === InputTypeEnum.REQ) index === recipeModel.value.requirements.length - 1 ? addRequirement() : removeRequirement(index)
  if (type === InputTypeEnum.ING) index === recipeModel.value.ingredients.length - 1 ? addIngredient() : removeIngredient(index)
  if (type === InputTypeEnum.STEP) index === recipeModel.value.steps.length - 1 ? addStep() : removeStep(index)
}

const onClickCounter = (type: CounterTypeEnum, value: number) => {
  if (type === CounterTypeEnum.SERVINGS) {
    if (recipeModel.value.servings + value > 0) recipeModel.value.servings += value * 1
    return
  }
  if (type === CounterTypeEnum.TIME) {
    if (recipeModel.value.time + value > 10) recipeModel.value.time += value * 5
    return
  }
}

</script>