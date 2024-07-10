<template>
  <button
    class="btn"
    :class="[color]"
  >
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

  &.red {
    background-color: var(--color-red);
  }
}
</style>
