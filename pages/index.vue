<template>
  <NuxtLayout>
    <template #title>
      <span>Итого:</span>
      <br />
      <strong>330</strong>
    </template>
    {{ urlSerachParams }}
    <br />
    {{ filters }}
    <br />
    <input className="input" placeholder="title" v-model="filters.name" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  title: "Главная",
});

const {
  filters,
  // updateCurrentFilterValue,
  urlSerachParams,
  resetFilterValues,
} = useFilter({
  initialFilters: {
    // "filterLIKE[name]": "123",
    name: "123",
  },
});

const { data, get } = await useApi({
  apiName: "users",
  apiMethod: "getAll",
});

await get();

watch(
  () => filters.value?.name,
  (newV) => {
    get();
  }
);
</script>

<style lang="scss" scoped></style>
