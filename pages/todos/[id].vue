<template>
  <NuxtLayout>
    <div class="">
      <pre> {{ data }}</pre>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data, get } = await useApi({
  apiName: "todos",
  apiMethod: "get",
  requestParams: {
    id: route.params.id,
  },
});

await get();

console.log(data.value);
</script>
