<template>
  <NuxtLayout>
    <form class="auth-form" @submit="onSubmit" method="post">
      <p class="auth-form__error error" v-if="errorMessage">
        {{ errorMessage }}
      </p>
      <div class="auth-form__fields">
        <FormField
          label="E-mail"
          type="email"
          v-model="state.email"
          :error="errors.email"
        />
        <FormField
          label="Пароль"
          type="password"
          v-model="state.password"
          :error="errors.password"
        />
      </div>
      <UiButton class="auth-form__btn">Вход</UiButton>
      <div>
        <NuxtLink class="link auth-form__link" to="/register"
          >Регистрация</NuxtLink
        >
      </div>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import formLite from "vue-form-lite";
import { required, maxLength, email } from "@vue-form-lite/rules";
import auth from "~/api/auth";
import type { ILogin } from "~/interfaces/models/user";

definePageMeta({
  layout: "auth",
});

const { login } = await useAuth();

const state = ref<ILogin>({
  email: "",
  password: "",
});

const { errors, handleSubmit, setErrors } = formLite({
  state,
  rules: {
    email: {
      email,
      required,
      maxLength: maxLength(255),
    },
    password: {
      required,
      maxLength: maxLength(255),
    },
  },
});

const errorMessage = ref<string>();

const onSubmit = handleSubmit(async (values: ILogin) => {
  const resErrors = await login(values);

  errorMessage.value = resErrors?.message;
});

useHead({
  title: "Вход",
});
</script>

<style lang="scss" scoped>
@import "./../assets/scss/components/auth-form.scss";
</style>
