<template>
  <div class="max-w-xs mx-auto">
    <label v-if="label" for="quantity-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}</label>
    <div class="relative flex items-center max-w-[8rem]">
      <button @click="onClickSubstract" type="button" :id="`${forValue}-decrement-button`" data-input-counter-decrement="quantity-input`"
        class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
        <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 18 2">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
        </svg>
      </button>
      <input :value="value" :min="min" :max="max" type="text" :id="`${forValue}quantity-input`" data-input-counter
        aria-describedby="helper-text-explanation"
        class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required />
      <button @click="onClickAdd" type="button" :id="`${forValue}-increment-button`" data-input-counter-increment="quantity-input"
        class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
        <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 1v16M1 9h16" />
        </svg>
      </button>
    </div>
    <p v-if="explainText" id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{
      explainText }}</p>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  forValue: string
  modelValue: number
  explainText?: string
  label?: string
  min?: number
  max?: number
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: number) {
    emit('update:modelValue', Number(value))
  }
})

const onClickSubstract = () => {
  if (value.value > (props.min || 0)) {
    value.value -= 1
  }
}

const onClickAdd = () => {
  if (value.value < (props.max || 100)) {
    value.value += 1
  }
}
</script>