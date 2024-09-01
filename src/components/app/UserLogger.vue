<template>
  <div>
    <h4>Лог редактирования</h4>
    <ul class="text-gray-400">
      <li v-for="item in props.logs" :key="item.id">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface ILog {
    id: number;
    text: string;
}
const props = defineProps<{logs:ILog[]}>();
</script>
