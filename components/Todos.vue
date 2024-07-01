<template>
  <div class="todos">
    <template v-if="type === 'category'">
      <TodoCategory
        class="todo"
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
      />
    </template>
    <template v-else>
      <TodoDefault
        class="todo"
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="todo"
        :isDifferentDates="todo.date !== todos?.[index - 1]?.date"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { ITodoPeriodView, ITodoView } from "~/interfaces/models/todo";

const emits = defineEmits(["clickTodo"]);
const props = defineProps<{
  todos: (ITodoView | ITodoPeriodView)[] | null;
  type?: "category";
}>();
</script>

<style lang="scss" scoped>
.todos {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}
</style>
