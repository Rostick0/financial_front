<template>
  <div class="header">
    <div class="container header__container">
      <UiButton @click="open" class="header-burger">
        <span class="header-burger__line"></span>
      </UiButton>
      <div class="header-title">
        <slot></slot>
      </div>
      <div class="header-action">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { open } = useModal({ name: "menu" });
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--header-background);
  border-radius: 0 0 12px 12px;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  &-burger {
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: 6px;
    width: 32px;
    height: 32px;

    &::before,
    &::after,
    &__line {
      background-color: var(--color-white);
      border-radius: 2px;
      content: "";
      display: inline-block;
      width: 100%;
      height: 2px;
    }
  }

  &-action {
    flex-shrink: 0;
    min-width: 32px;
  }
}
</style>
