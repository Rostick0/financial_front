<template>
  <div class="wrapper">
    <div class="auth">
      <div class="auth__title">Мои финансовик</div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  &__title {
    font-size: 28px;
    margin-bottom: 28px;
  }
}
</style>
