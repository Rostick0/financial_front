<template>
  <NuxtLayout>
    <template #title>
      <HeaderMain />
    </template>
    <div class="container">
      <TodoFormCreate />
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Создание операции",
});

definePageMeta({
  middleware: ["auth"],
});
</script>
