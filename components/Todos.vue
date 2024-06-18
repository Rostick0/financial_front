<template>
  <div class="todos">
    <Todo class="todo" v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script lang="ts" setup>
import type { ITodoPeriodView, ITodoView } from "~/interfaces/models/todo";

const props = defineProps<{
  todos: (ITodoView | ITodoPeriodView)[] | null;
}>();
</script>

<style lang="scss" scoped>
.todos {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}
</style>
