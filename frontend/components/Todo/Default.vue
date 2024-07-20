<template>
  <div v-if="isDifferentDates">
    {{ showDate }}
  </div>
  <NuxtLink class="todo" :to="`/todos/${todo.id}`">
    <UiIcon class="todo__icon" :color="todo.category?.color" />

    <div class="todo__title">
      {{ todo?.title }}
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
  isDifferentDates?: boolean;
}>();

const showDate = computed(
  () => props.isDifferentDates && new Date(props.todo.date).toLocaleDateString()
);
const sum = computed(() => props.todo.sum?.toLocaleString());
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/components/todo.scss";
</style>
