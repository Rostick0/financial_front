<template>
  <NuxtLayout>
    <template #title>
      <HeaderMain />
    </template>
    <div class="container">
      <TodoFormUpdate :data="data" />
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
  title: "Редактирование операции " + (data?.title ?? `#${id}`),
});

definePageMeta({
  middleware: ["auth"],
});
</script>
