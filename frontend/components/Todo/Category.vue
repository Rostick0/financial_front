<template>
  <NuxtLink class="todo" :to="`/category/${todo.categoryId}`">
    <UiIcon class="todo__icon" :color="todo.category?.color" />
    <div class="todo__title">
      {{ todo?.category?.title }}
    </div>
    <div class="todo__sum">
      {{ sum }}
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { ITodoPeriodView, ITodoView } from "~/interfaces/models/todo";

const props = defineProps<{
  todo: ITodoView | ITodoPeriodView;
}>();

const sum = computed(() => props.todo.sum?.toLocaleString());
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/components/todo.scss";
</style>
