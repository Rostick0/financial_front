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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::before {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.2s;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &__inner {
    overflow: auto;
    max-height: 100%;
  }
}
</style>
