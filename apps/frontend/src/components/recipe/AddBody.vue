<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">

      <!-- settings -->
      <div class="flex gap-2">
        <div class="w-1/2">
          <span class="flex items-center gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <Icon name="flowbite:user-solid" />
            Aantal personen
          </span>
          <SCounter v-model="recipeModel.servings" />
        </div>
        <!-- prep time -->
        <div class="w-1/2">
          <span class="flex items-center gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <Icon name="flowbite:clock-outline" />
            Bereidingstijd (min)
          </span>
          <div class="flex items-center gap-2">
            <SCounter v-model="recipeModel.time" />
          </div>
        </div>


      </div>
      <!-- category -->
      <div>
        <span class="flex items-center gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <Icon name="flowbite:file-circle-plus-outline" />
          Categorie
        </span>
        <FwbSelect v-model="recipeModel.category.label" :options="categoryOptions" placeholder="Kies een categorie" />
      </div>

      <!-- name -->
      <span class="flex items-center gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
        <Icon name="flowbite:file-circle-plus-outline" />
        Titel
      </span>
      <FwbInput v-model="recipeModel.title" type="text" name="title" label="" placholder="Titel" required />

      <!-- description -->
      <div>
        <span class="flex items-center gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">
          <Icon name="flowbite:annotation-outline" />
          Omschrijving
        </span>
        <FwbTextarea v-model="recipeModel.description" name="description" placeholder="Recept beschrijving" label=""
          required />
      </div>
      <!-- veggie options -->
      <div class="flex flex-col gap-3 m-3">
        <div class="flex">
          <FwbCheckbox class="w-1/2" v-model="recipeModel.vegetarian" label="Vegetarisch" />
          <FwbCheckbox class="w-1/2" v-model="recipeModel.vegan" label="Vegan" />
        </div>
        <div class="flex">
          <FwbCheckbox class="w-1/2" v-model="recipeModel.glutefree" label="Glutenvrij" />
          <FwbCheckbox class="w-1/2" v-model="recipeModel.lactofree" label="Lactosevrij" />
        </div>
      </div>

      <!-- requirements -->
      <div>
        <span class="flex items-center gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <Icon name="icon-park-outline:cook" />
          Benodigdheden
        </span>
        <div class="flex gap-2 mb-2" v-for="(req, i) in recipeModel.requirements">
          <FwbInput class="w-10" v-model="recipeModel.requirements[i].amount" type="number" name="requirement"
            placeholder="Hoeveelheid" required />
          <FwbSelect class="grow" v-model="recipeModel.requirements[i].name" :options="requirementOptions"
            placeholder="Kies keukengerei" />
          <FwbButton class="flex justify-center items-centertext-center" size="md" :color="getColor(InputTypeEnum.REQ, i)"
            @click.prevent="onClickButton(InputTypeEnum.REQ, i)">
            <Icon :name="getIcon(InputTypeEnum.REQ, i)" />
          </FwbButton>
        </div>
      </div>

      <!-- ingredients -->
      <div>
        <span class="flex items-center gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <Icon name="fluent-emoji-high-contrast:broccoli" />
          Ingredienten
        </span>
        <div class="flex gap-2 items-center" v-for="(_ing, i) in recipeModel.ingredients">
          <div class="flex grow flex-col gap-2 mb-2">
            <div class="flex gap-2">
              <FwbInput class="w-10" v-model="recipeModel.ingredients[i].amount" type="number" name="ingredient"
                placeholder="Hoeveelheid" required />
              <FwbSelect class="grow" v-model="recipeModel.ingredients[i].unit" :options="unitOptions"
                placeholder="Kies een hoeveelheid" />
            </div>
            <div class="flex gap-2">
              <FwbInput class="grow" v-model="recipeModel.ingredients[i].name" type="text" name="ingredient"
                placeholder="Kies een ingredient" required />
            </div>
          </div>
          <FwbButton class="flex text-center items-center" size="md" :color="getColor(InputTypeEnum.ING, i)"
            @click.prevent="onClickButton(InputTypeEnum.ING, i)">
            <Icon :name="getIcon(InputTypeEnum.ING, i)" />
          </FwbButton>
        </div>
      </div>

      <!-- steps -->
      <div>
        <span class="flex items-center gap-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">
          <Icon name="flowbite:ordored-list-outline" />
          Instructies
        </span>
        <div class="flex gap-2 mb-2" v-for="(step, i) in recipeModel.steps">
          <FwbInput class="grow" v-model="step.description" type="text" name="step" placeholder="Voeg een stap toe"
            required />
          <FwbButton class="flex justify-center text-center" size="md" :color="getColor(InputTypeEnum.STEP, i)"
            @click.prevent="onClickButton(InputTypeEnum.STEP, i)">
            <Icon :name="getIcon(InputTypeEnum.STEP, i)" />
          </FwbButton>
        </div>
      </div>

      <!-- images -->
      <fwb-file-input v-model="recipeModel.images" label="Upload file" multiple />
      <div v-if="recipeModel.images.length !== 0"
        class="mt-4 border-[1px] border-gray-300 dark:border-gray-600 p-2 rounded-md">
        <div v-for="file in recipeModel.images" :key="file">
          {{ file.name }}
        </div>
      </div>

      <!-- error -->
      <span class="text-sm text-red-500 pt-5">{{ recipeStore.error }}</span>

      <!-- button -->
      <div class="flex gap-2">
        <fwb-button class="flex grow justify-center text-center" size="md" color="green" @click.prevent="onSaveRecipe">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Recept opslaan</span>
        </fwb-button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { FwbSpinner, FwbInput, FwbTextarea, FwbCheckbox, FwbButton, FwbDropdown, FwbListGroupItem, FwbSelect, FwbFileInput } from 'flowbite-vue';
import { useRecipeStore } from '../../stores/recipeStore';
import { tools } from '../../data/tools'
import { units } from '../../data/units'
import { categories } from '../../data/categories'

enum InputTypeEnum {
  REQ = 1,
  ING = 2,
  STEP = 3
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
  category: { id: 3, value: 'dinner', label: 'Diner' },
  vegetarian: false,
  vegan: false,
  glutefree: false,
  lactofree: false,
  servings: 4,
  time: 30,
  requirements: [{ name: '', amount: 1 }],
  ingredients: [{ unit: '', name: '', amount: 1 }],
  steps: [{ description: '' }],
  images: [],
})

const categoryOptions = categories.map((category) => {
  return { id: category.id, value: category.label, name: category.label }
})

const requirementOptions = computed(() => {
  return tools.map((tool) => {
    return { id: tool.id, value: tool.description, name: tool.description }
  }).sort((a, b) => a.name.localeCompare(b.name))
})

const unitOptions = computed(() => {
  return units.map((tool) => {
    return { id: tool.id, value: tool.description, name: tool.description }
  }).sort((a, b) => a.name.localeCompare(b.name))
})

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
  recipeModel.value.requirements.push({ name: '', amount: 1 })
}

const removeRequirement = (index: number) => {
  recipeModel.value.requirements = recipeModel.value.requirements.filter((_, i) => i !== index)
}

const addIngredient = () => {
  recipeModel.value.ingredients.push({ unit: '', name: '', amount: 1 })
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

const onSaveRecipe = async () => {
  isLoading.value = true
  await recipeStore.addRecipe(recipeModel.value)
  isLoading.value = false
}

</script>