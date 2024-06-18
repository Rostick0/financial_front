<template>
  <NuxtLayout>
    <template #title>
      <!-- {{ user }} -->
      <div class="main-page-header">
        <span>Итого:</span>
        <strong>{{ user?.balance ?? 0 }}</strong>
        <div class="main-page-header__switch">
          <button
            @click="switchHeaderMain = 'expenses'"
            class="main-page-header__switch_btn"
            :class="{
              active: switchHeaderMain === 'expenses',
            }"
          >
            Расходы
          </button>
          <button
            @click="switchHeaderMain = 'income'"
            class="main-page-header__switch_btn"
            :class="{
              active: switchHeaderMain === 'income',
            }"
          >
            Доходы
          </button>
        </div>
      </div>
    </template>
    <div class="container">
      <MainSwitchRange :nameModal="nameModal" />
      <LazyMainChart :data="data" />
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
import type { IUser } from "~/composables/useAuth";
import type { ITodoView } from "~/interfaces/models/todo";

const nameModal = "switchDatapicker";
useHead({
  title: "Главная",
});

type TypeSwitchHeaderMain = "expenses" | "income";

const switchHeaderMain = useState<TypeSwitchHeaderMain>(
  "switchHeaderMain",
  () => (useRoute().query?.TypeCategory as TypeSwitchHeaderMain) ?? "expenses"
);

const {
  filters,
  // updateCurrentFilterValue,
  urlSerachParams,
  resetFilterValues,
} = useFilter<{ TypeCategory: TypeSwitchHeaderMain }>({
  initialFilters: {
    // "filterLIKE[name]": "123",
    // name: "123",
    TypeCategory: switchHeaderMain.value,
  },
});

watch(
  () => switchHeaderMain.value,
  lodashDebounce((nV: TypeSwitchHeaderMain) => {
    console.log(nV);
    filters.value.TypeCategory = nV;
    // filters.value.TypeCategory = nV;
  }, 400)
);

const { data, get } = await useApi<ITodoView>({
  apiName: "todos",
  apiMethod: "getAll",
  filters,
});

onMounted(async () => {
  await get();
  console.log(data.value);
});

const user = useState<IUser>("user");

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
