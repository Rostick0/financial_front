<template>
  <Transition>
    <div v-show="isOpen" @click.self="close" class="menu">
      <div class="menu__inner">
        <div class="menu__list">
          <NuxtLink
            v-for="item in menuList"
            :key="item.name"
            @click="close"
            :to="item.link"
            class="menu__item"
          >
            <template v-html="item.icon"></template>
            <span>{{ item.name }}</span>
          </NuxtLink>

          <button @click="logout()" class="menu__item">
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="a" fill="#fff">
                <path
                  d="M0 1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1Z"
                />
              </mask>
              <path
                d="M-1 1a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2H-1Zm15 14a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2h15ZM1 17a2 2 0 0 1-2-2V1a2 2 0 0 1 2-2v18ZM14 0v16V0Z"
                fill="#fff"
                mask="url(#a)"
              />
              <path
                d="M8 7.5a.5.5 0 0 0 0 1v-1Zm8.354.854a.5.5 0 0 0 0-.708l-3.182-3.182a.5.5 0 1 0-.708.708L15.293 8l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182ZM8 8.5h8v-1H8v1ZM13 13.5a.5.5 0 0 1 1 0V15h-1v-1.5ZM14 1h-1v1.5a.5.5 0 0 0 1 0V1Z"
                fill="#fff"
              />
            </svg>
            <span>Выход</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const { isOpen, close } = useModal({ name: "main-menu" });

const menuList = [
  {
    icon: `<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7.5" stroke="#fff" /><circle cx="8" cy="8" r="3.5" stroke="#fff" /><path stroke="#fff" d="M1 8.5h4M8.5 15v-4M10.646 5.475l2.829-2.829M4.354 1.646l2.828 2.829" /></svg>`,
    link: "/",
    name: "Главная",
  },
  {
    icon: `<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" stroke="#fff" /><circle cx="8" cy="8" r="2.5" stroke="#fff" /><path fill="#fff" d="M5.2 7.5v1H0v-1zM16 7.5v1h-5.2v-1zM7.5 0h1v5.2h-1zM7.5 10.8h1V16h-1zM13.303 1.99l.707.707-3.674 3.673-.707-.707zM5.668 9.625l.707.707-3.678 3.679-.707-.708zM10.334 9.627l3.676 3.676-.707.707-3.676-3.676zM2.697 1.99l3.677 3.677-.708.707L1.99 2.697zM10.6.418l.924.383-.46 1.109-.923-.383zM15.2 4.477l.382.924-1.109.46-.382-.925zM15.582 10.599l-.383.924-1.108-.46.382-.923zM11.524 15.2l-.924.382-.46-1.109.924-.382zM5.4 15.583l-.924-.383.46-1.109.923.383zM.8 11.524.417 10.6l1.109-.46.383.925zM.417 5.4.8 4.476l1.109.46-.383.923zM4.477.8 5.4.417l.459 1.109-.924.383z" /></svg>`,
    link: "/settings",
    name: "Настройки",
  },
];

const { logout } = await useAuth();

// const logout = () => {

//   navigateTo("/login");
// };
</script>

<style lang="scss" scoped>
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
    padding: 16px 32px;
    transform: translateX(0);
    width: fit-content;
    height: 100%;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }

  &__item {
    color: var(--color-white);
    display: flex;
    align-items: center;
    column-gap: 8px;
    font-size: 16px;
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
