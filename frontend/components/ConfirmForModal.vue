<template>
  <div class="confirm">
    <div class="confirm__title">
      {{ title ?? "Вы подтверждаете действие?" }}
    </div>
    <div class="confirm__btns">
      <UiButton class="confirm__btn" @click="emits('confirm'), closeModal?.()"
        >Да</UiButton
      >
      <UiButton
        class="confirm__btn"
        @click="emits('cancel'), closeModal?.()"
        color="red"
        >Нет</UiButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title?: String;
  closeModal?: Function;
}>();

const emits = defineEmits(["confirm", "cancel"]);
</script>

<style lang="scss" scoped>
.confirm {
  background-color: var(--header-background);
  border-radius: 12px;
  padding: 16px;

  &__title {
    margin-bottom: 20px;
  }

  &__btns {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
  }

  &__btn {
    justify-content: center;
  }
}
</style>
