<template>
  <NuxtLayout>
    <div></div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  title: "Настройки",
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<style></style>
