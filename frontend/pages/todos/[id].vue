<template>
  <NuxtLayout>
    <div class="container">
      <!-- <pre> {{ data }}</pre> -->
      <div class="todo">
        <div class="todo-field">
          <div class="todo-field__title">Сумма</div>
          <div class="todo-field__value">
            {{ data.sum?.toLocaleString() }} ₽
          </div>
        </div>
        <div class="todo-field">
          <div class="todo-field__title">Категория</div>
          <div class="todo-field__value d-flex align-items-center">
            <UiIcon :color="data.category?.color" />
            <span>
              {{ data.category?.title }}
            </span>
          </div>
        </div>
        <div class="todo-field">
          <div class="todo-field__title">Название</div>
          <div class="todo-field__value">{{ data.title ?? "-" }}</div>
        </div>
        <div class="todo-field">
          <div class="todo-field__title">Описание</div>
          <div class="todo-field__value">{{ data.description ?? "-" }}</div>
        </div>
        <div class="todo-field">
          <div class="todo-field__title">Дата</div>
          <div class="todo-field__value">
            {{ new Date(data.date).toLocaleDateString() }}
          </div>
        </div>
        <div class="d-flex todo-btns">
          <NuxtLink :to="`/todos/edit-${data.id}`">
            <UiButton>Изменить</UiButton>
          </NuxtLink>
          <UiButton color="red">Удалить</UiButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import api from "~/api";
import type { ITodoView } from "~/interfaces/models/todo";

const route = useRoute();
const id = route.params.id as string;

const data: ITodoView = await api.todos.get?.({ id });

if (!data) navigateTo("/404");

useHead({
  title: "Детали операции " + (data?.title ?? `#${id}`),
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 16px;

  &-field {
    &__title {
      font-size: 14px;
      margin-bottom: 4px;
      opacity: 0.75;
    }

    &__value {
      grid-gap: 4px;
    }
  }

  &-btns {
    column-gap: 10px;
  }
}
</style>
