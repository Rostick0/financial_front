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
      <Todos :todos="data" />
      <NuxtLink class="button-bottom-add" to="/todos/create">
        <UiButton class="button-bottom-add__inner"></UiButton>
      </NuxtLink>
      <LazyUiModal :name="nameModal">
        <MainDatapickerRange :nameModal="nameModal" />
      </LazyUiModal>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import moment from "moment";
import type { IUser } from "~/composables/useAuth";
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

const mainDateRange = useState<[Date, Date | null]>("mainDateRange", () => [
  moment().startOf("week").toDate(),
  moment().endOf("week").toDate(),
]);

onBeforeUnmount(() => {
  clearNuxtState("mainDateRange");
});

watch(
  () => mainDateRange.value,
  (newV) => {
    if (filters.value?.MinDate)
      filters.value.MinDate = moment(newV?.[0]).toISOString();
    if (filters.value?.MaxDate)
      filters.value.MaxDate = moment(newV?.[1]).toISOString();
  }
);

const { filters, urlSerachParams, resetFilterValues } = useFilter<{
  TypeCategory: TypeCategory;
  MinDate: Date;
  MaxDate: Date;
}>({
  initialFilters: {
    // name: "123",
    TypeCategory: switchHeaderMain.value,
    MinDate: moment(mainDateRange.value?.[0]).toISOString(),
    MaxDate: moment(mainDateRange.value?.[1]).toISOString(),
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
});

await get({ type: "Period" });
</script>

<style lang="scss" scoped>
.main-page {
  // &-header {

  // }
}

.button-bottom-add {
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 20px;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 32px;
    height: 32px;

    &::before,
    &::after {
      background-color: var(--color-white);
      border-radius: 2px;
      content: "";
      display: block;
      position: absolute;
      width: calc(100% - 12px);
      height: 2px;
    }

    &::before {
      transform: rotate(90deg);
    }
  }
}
</style>
