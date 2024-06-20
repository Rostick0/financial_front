<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.btn {
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 6px;
  display: flex;
  padding: 6px;
}
</style>
