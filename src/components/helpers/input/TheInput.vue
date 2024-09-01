<template>
  <div class="flex flex-col gap-2">
    <input
      class="h-5"
      :class="{ 'border-red': error }"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      required
    />
    <span class="text-red">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number;
  error?: string;
  type?: string;
  placeholder?: string;
}>();

const emits = defineEmits<{
  (event: 'update:modelValue', text: string | number): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = props.type === 'number' ? Number(target.value) : target.value
  emits('update:modelValue', value);
};
</script>
