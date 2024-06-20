<template>
  <label class="field form-block">
    <div v-if="label" class="field__label">{{ label }}</div>
    <template v-else-if="$slots.label">
      <slot name="label"></slot>
    </template>
    <input
      v-bind="$attrs"
      class="field__input"
      @input="handleInput"
      type="text"
      :value="modelValue"
      v-maska
      :data-maska="maska"
      :data-maska-tokens="maskaTokens"
      :data-maska-reversed="maskaReversed"
    />
  </label>
  <div v-if="error" class="field__error error">{{ error }}</div>
  <template v-else-if="$slots.label">
    <slot name="error"></slot>
  </template>
</template>

<script lang="ts" setup>
import type { MaskTokens } from 'maska';

const emits = defineEmits(["update:modelValue"]);

const props = defineProps<{
  label?: string;
  error?: Ref<string> | string;
  modelValue?: any;
  maska?: string;
  maskaTokens?: string;
  maskaReversed?: boolean;
}>();
console.log(props.modelValue)
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;

  emits("update:modelValue", target.value);
};
</script>

<style lang="scss" scoped>
.field {
  &__input {
    background-color: var(--header-background);
    color: var(--color-white);
    border-radius: 8px;
    font-size: 16px;
    padding: 12px;
  }
}
</style>
