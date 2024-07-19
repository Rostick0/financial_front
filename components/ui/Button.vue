<template>
  <button class="btn" :class="[color]">
    <slot />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  color?: "red";
}>();
</script>

<style lang="scss" scoped>
.btn {
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 6px;
  display: flex;
  padding: 6px 12px;
  transition: 0.3s;

  &.red {
    background-color: var(--color-red);
  }

  &:active {
    transform: scale(0.99);
  }
}
</style>
