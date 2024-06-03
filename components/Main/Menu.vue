<template>
  <Transition>
    <div v-show="isOpen" @click.self="close" class="menu">
      <div class="menu__inner">
        <div class="container">321312</div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const { isOpen, close } = useModal({ name: "main-menu" });
</script>

<style lang="scss" scoped>
// @keyframes menu-in {
//   0% {
//     transform: translate(-150%);
//   }

//   100% {
//     transform: translate(0);
//   }
// }

.menu {
  position: fixed;
  top: 0;
  height: 0;
  width: 100%;
  min-height: 100dvh;

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
    background-color: var(--color-blue);
    color: var(--color-white);
    padding: 16px 0;
    transform: translateX(0);
    width: fit-content;
    height: 100%;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;

  &::before,
  .menu__inner {
    transition: 0.3s;
  }
}

// .v-leave-active {
//   .menu__inner {
//     // animation: menu-in 1s reverse;
//     transform: translateX(-150%);
//   }
// }

.v-enter-from,
.v-leave-to {
  // opacity: 0;

  &::before {
    opacity: 0;
  }

  .menu__inner {
    transform: translateX(-150%);
  }
}
</style>
