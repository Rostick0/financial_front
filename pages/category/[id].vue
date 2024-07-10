<template>
  <NuxtLayout>
    <template #title>
      <HeaderMain>
        <SwitchTypeTodo v-model="switchHeaderMain" />
      </HeaderMain>
    </template>
    <div class="container">
      <MainSwitchRange :nameModal="nameModal" />
      <Todos :todos="data" />
      <LazyBtnAdd to="/todos/create" />
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
useHead({
  title: "Главная",
});

const switchHeaderMain = useState<TypeCategory>(
  "switchHeaderMain",
  () => (useRoute().query?.TypeCategory as TypeCategory) ?? "Expenses"
);

const mainDateRange = useState<[string, string]>("mainDateRange", () => [
  getDate(moment().startOf("week").toDate()),
  getDate(moment().endOf("week").toDate()),
]);

watch(
  () => mainDateRange.value,
  (newV) => {
    if (filters.value?.MinDate) filters.value.MinDate = getDate(newV?.[0]);
    if (filters.value?.MaxDate && newV?.[1])
      filters.value.MaxDate = getDate(newV?.[1]);
  }
);

const route = useRoute();
// console.log(mainDateRange.value);

const { filters, urlSerachParams, resetFilterValues } = useFilter<{
  TypeCategory: TypeCategory;
  MinDate: Date;
  MaxDate: Date;
}>({
  initialFilters: {
    TypeCategory: switchHeaderMain.value,
    MinDate: getDate(mainDateRange.value?.[0]),
    MaxDate: getDate(mainDateRange.value?.[1]),
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
  params: {
    categoryId: route.params.id,
  },
  withCache: true,
});

await get();
</script>

<style lang="scss" scoped>
.main-page {
  // &-header {

  // }
}
</style>
