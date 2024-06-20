<template>
  <div class="categories-select form-block">
    <div class="categories-select__label">Выберите категорию</div>
    <div class="categories-select__list">
      <div
        v-for="item in data"
        :key="item.id"
        class="categories-select__item"
        :class="{
          active: item.id === selectedId,
        }"
        @click="selectedId = item.id"
      >
        <div
          class="categories-select__icon"
          :style="{ background: item.color }"
        ></div>
        <div class="categories-select__title">{{ item.title }}</div>
      </div>
    </div>
    <div v-if="error" class="categories-select__error error">{{ error }}</div>
    <template v-else-if="$slots.label">
      <slot name="error"></slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { ICategoryView } from "~/interfaces/models/category";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{
  error?: Ref<string> | string;
  modelValue?: number;
}>();

const selectedId = ref<number | undefined>(props.modelValue);

const { data } = await useApi<ICategoryView>({
  apiName: "categories",
  apiMethod: "getAll",
  init: true,
});

watch(
  () => selectedId.value,
  (newV) => {
    emits("update:modelValue", newV);
  }
);
</script>

<style lang="scss" scoped>
.categories-select {
  &__list {
    display: grid;
    grid-gap: 4px;
    grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
  }

  &__item {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }

  &__icon {
    border-radius: 50%;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  &__title {
    font-size: 15px;
  }
}
</style>
