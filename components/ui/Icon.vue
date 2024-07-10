<template>
  <div class="icon" :style="{ backgroundColor: color }"></div>
</template>

<script lang="ts" setup>
const props = defineProps<{ color?: string }>();
</script>

<style lang="scss" scoped>
.icon {
  background-color: var(--ui-color);
  border-radius: 50%;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}
</style>
