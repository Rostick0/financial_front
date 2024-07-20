<template>
  <div class="header-main">
    <span>Итого:</span>
    <strong>{{ user?.balance?.toLocaleString() ?? 0 }}</strong>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const user = useState<IUser>("user");
</script>

<style lang="scss" scoped>
.header-main {
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 6px;
  padding-bottom: 10px;
}
</style>
