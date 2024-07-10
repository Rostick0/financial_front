<template>
  <NuxtLayout>
    <template #title>
      <HeaderMain>
        <SwitchTypeTodo v-model="switchHeaderMain" />
      </HeaderMain>
    </template>
    <div class="container">
      <MainSwitchRange :nameModal="nameModal" />
      <LazyMainChart :data="data" />
      <Todos :todos="data" type="category" />
      <LazyBtnAdd class="button-bottom-add" to="/todos/create" />
      <LazyUiModal :name="nameModal">
        <MainDatapickerRange :nameModal="nameModal" />
      </LazyUiModal>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import moment from "moment";
import type { TypeCategory } from "~/interfaces/models/category";
import type { ITodoPeriodView } from "~/interfaces/models/todo";

const nameModal = "switchDatapicker";

const mainDateRange = useState<[string, string]>("mainDateRange", () => [
  getDate(moment().startOf("week").toDate()),
  getDate(moment().endOf("week").toDate()),
]);

// onBeforeUnmount(() => {
//   clearNuxtState("mainDateRange");
// });

watch(
  () => mainDateRange.value,
  (newV) => {
    if (filters.value?.MinDate) filters.value.MinDate = getDate(newV?.[0]);
    if (filters.value?.MaxDate && newV?.[1])
      filters.value.MaxDate = getDate(newV?.[1]);
  }
);

const switchHeaderMain = useState<TypeCategory>(
  "switchHeaderMain",
  () => (useRoute().query?.TypeCategory as TypeCategory) ?? "Expenses"
);

const { filters, urlSerachParams, resetFilterValues } = useFilter<{
  TypeCategory: TypeCategory;
  MinDate: Date;
  MaxDate: Date;
}>({
  initialFilters: {
    // name: "123",
    TypeCategory: switchHeaderMain.value,
    MinDate: getDate(mainDateRange.value[0]),
    MaxDate: getDate(mainDateRange.value[1]),
  },
});

watch(
  () => switchHeaderMain.value,
  lodashDebounce((nV: TypeCategory) => {
    if (filters.value?.TypeCategory) {
      filters.value.TypeCategory = nV;
    }
  }, 400)
);

const { data, get } = await useApi<ITodoPeriodView>({
  apiName: "todos",
  apiMethod: "getAll",
  filters,
  requestParams: { type: "Period" },
  withCache: true
});

await get();

useHead({
  title: "Главная",
});
</script>

<style lang="scss" scoped>
.main-page {
  // &-header {

  // }
}
</style>
