<template>
  <div class="todo">
    <div
      class="todo__icon"
      :style="{ backgroundColor: todo.category?.color }"
    ></div>
    <div class="todo__title">
      {{ todo?.category?.title }}
    </div>
    <div class="todo__price">
      {{ sum }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ITodoPeriodView, ITodoView } from "~/interfaces/models/todo";

const props = defineProps<{ todo: ITodoView | ITodoPeriodView }>();

const sum = computed(() => props.todo.sum?.toLocaleString());
</script>

<style lang="scss" scoped>
.todo {
  background-color: var(--header-background);
  border-radius: 12px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 16px;

  &__icon {
    border-radius: 50%;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  &__title {
    font-size: 18px;
  }

  &__price {
    margin-left: auto;
  }
}
</style>
