<template>
  <NuxtLayout>
    <template #title>
      <span>Итого:</span>
      <br />
      <strong>330</strong>
    </template>
    <div class="container">
      <MainSwitchRange :nameModal="nameModal" />
      <LazyMainChart />
      <LazyUiModal :name="nameModal">
        <MainDatapickerRange :nameModal="nameModal" />
      </LazyUiModal>
    </div>
    <!-- <br /> -->
    <!-- <input className="input" placeholder="title" v-model="filters.name" /> -->
  </NuxtLayout>
</template>

<script lang="ts" setup>
import moment from "moment";

const nameModal = "switchDatapicker";
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

const mainDateRange = useState<[Date, Date | null]>("mainDateRange", () => [
  moment().startOf("week").toDate(),
  moment().endOf("week").toDate(),
]);

onBeforeUnmount(() => {
  clearNuxtState("mainDateRange");
});

// watch(
//   () => filters.value?.name,
//   (newV) => {
//     get();
//   }
// );
</script>

<style lang="scss" scoped></style>
