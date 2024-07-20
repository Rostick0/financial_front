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
          v-model="state.Email"
          :error="errors.Email"
        />
        <FormField
          label="Пароль"
          type="password"
          v-model="state.Password"
          :error="errors.Password"
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
import type { ILogin } from "~/interfaces/models/user";

const { login } = await useAuth();

const state = ref<ILogin>({
  Email: "",
  Password: "",
});

const { errors, handleSubmit, setErrors } = formLite({
  state,
  rules: {
    Email: {
      email,
      required,
      maxLength: maxLength(255),
    },
    Password: {
      required,
      maxLength: maxLength(255),
    },
  },
});

const errorMessage = ref<string>();

const onSubmit = handleSubmit(async (values: ILogin) => {
  const resErrors = await login(values);

  errorMessage.value = resErrors?.message;
  setErrors(convertValuesToString(resErrors?.errors));
});

useHead({
  title: "Вход",
});

definePageMeta({
  layout: "auth",
  middleware: ["no-auth"],
});
</script>

<style lang="scss" scoped>
@import "./../assets/scss/components/auth-form.scss";
</style>
