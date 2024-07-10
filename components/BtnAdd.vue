<template>
  <NuxtLink v-if="to" class="button-bottom-add" :to="to">
    <UiButton class="button-bottom-add__inner"></UiButton>
  </NuxtLink>
  <span v-else class="button-bottom-add">
    <UiButton class="button-bottom-add__inner"></UiButton>
  </span>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  to?: RouteLocationRaw;
}>();
</script>

<style lang="scss" scoped>
.button-bottom-add {
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 20px;

  &__inner {
    border-radius: 50%;
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
      width: calc(100% - 16px);
      height: 2px;
    }

    &::before {
      transform: rotate(90deg);
    }
  }
}
</style>
