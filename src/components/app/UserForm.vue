<template>
  <form class="flex gap-2 w-fit h-12" novalidate @submit.prevent="createUser">
    <TheInput
      type="text"
      placeholder="name"
      :error="errors.name"
      v-model="form.name"
    />
    <select class="h-5" name="gender" id="gender" v-model="form.gender">
      <option value="male">male</option>
      <option value="female">female</option>
    </select>
    <TheInput
      type="email"
      placeholder="email"
      :error="errors.email"
      v-model="form.email"
    />
    <TheInput
      type="number"
      placeholder="age"
      :error="errors.age"
      v-model="form.age"
    />
    <button class="h-5" type="submit">добавить</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { type TableData, Gender } from '../../api/api';
import TheInput from '../helpers/input/TheInput.vue';

const emits = defineEmits<{ (event: 'create', form: TableData): void }>();

const form = reactive<TableData>({
  name: undefined,
  age: undefined,
  email: undefined,
  gender: Gender.Male,
});

const errors = reactive<Record<keyof TableData, string | undefined>>({
  name: '',
  age: '',
  email: '',
  gender: '',
});

const clearForm = () => {
  form.name = undefined;
  form.age = undefined;
  form.email = undefined;
  form.gender = Gender.Male;
};

const createUser = () => {
  for (const key of Object.keys(form) as (keyof TableData)[]) {
    const value = form[key];
    errors[key] = undefined;
    if (value === undefined || value === null || value === '') {
      errors[key] = `${key} is required`;
    }
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
    errors.email = 'Email is invalid';
  }
  if (Object.values(errors).some((item) => item)) return;
  emits('create', form);
  clearForm();
};
</script>
