<template>
  <div class="switch">
    <div
      @click="emits('update:modelValue', 'Expenses')"
      class="switch__btn"
      :class="{
        active: modelValue === 'Expenses',
      }"
      role="button"
    >
      Расходы
    </div>
    <div
      @click="emits('update:modelValue', 'Income')"
      class="switch__btn"
      :class="{
        active: modelValue === 'Income',
      }"
      role="button"
    >
      Доходы
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TypeCategory } from "~/interfaces/models/category";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{ modelValue: TypeCategory }>();

// const switchHeaderMain = ref<TypeCategory>(
//   props.defaultValue ?? "Expenses"
// );
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  column-gap: 20px;

  &__btn {
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
</style>
