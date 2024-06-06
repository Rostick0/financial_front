<template>
  <div v-if="isOpen" @click.prevent="close" class="modal">
    <div class="modal__inner">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const { isOpen, close } = useModal({ name });
</script>

<style lang="scss" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &__inner {
    overflow: auto;
    max-height: 100%;
  }
}
</style>
