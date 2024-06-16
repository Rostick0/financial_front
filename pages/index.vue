<template>
  <NuxtLayout>
    <template #title>
      <div class="main-page-header">
        <span>Итого:</span>
        <strong>330</strong>
        <div class="main-page-header__switch">
          <button
            @click="switchHeader = 'expenses'"
            class="main-page-header__switch_btn"
            :class="{
              active: switchHeader === 'expenses',
            }"
          >
            Расходы
          </button>
          <button
            @click="switchHeader = 'income'"
            class="main-page-header__switch_btn"
            :class="{
              active: switchHeader === 'income',
            }"
          >
            Доходы
          </button>
        </div>
      </div>
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

const switchHeader = ref<"expenses" | "income">("expenses");

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

// const { data, get } = await useApi({
//   apiName: "users",
//   apiMethod: "getAll",
// });

// await get();

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

<style lang="scss" scoped>
.main-page {
  &-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 6px;
    padding-bottom: 10px;

    &__switch {
      display: flex;
      column-gap: 20px;

      &_btn {
        color: var(--color-white);
        font-size: 16px;
        position: relative;

        &::before {
          background-color: var(--color-white);
          content: "";
          position: absolute;
          bottom: 0;
          transform: translateY(150%);
          transition: 0.3s;
          width: 0;
          height: 2px;
        }

        &.active {
          &::before {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
