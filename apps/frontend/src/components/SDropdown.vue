<template>
  <div class="dropdown">
    <FwbDropdown :text="label" @click.prevent>
      <FwbListGroup class="grow">
        <FwbListGroupItem v-for="option in options" hover>
          {{ option.label }}
        </FwbListGroupItem>
      </FwbListGroup>
    </FwbDropdown>
  </div>
</template>
<script lang="ts" setup>
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
import { defineEmits } from 'vue';
import { onMounted, computed } from 'vue'

interface IDropdownOption {
  id: number,
  value: string
  label: string
}

const props = defineProps<{
  modelValue: IDropdownOption
  options: IDropdownOption[]
  label: string
}>()

const emit = defineEmits(['update:modelValue'])

const selectedInternal = computed({
  get() {
    return props.modelValue
  },
  set(value: IDropdownOption) {
    emit('update:modelValue', value)
  }
})

</script>

<style lang="scss" setup>
.dropdown {
  width: 100% !important;
  z-index: 5;
  max-height: 100px;
}
</style>