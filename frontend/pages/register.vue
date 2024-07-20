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
      <UiButton class="auth-form__btn">Регистрация</UiButton>
      <div>
        <NuxtLink class="link auth-form__link" to="/login">Вход</NuxtLink>
      </div>
    </form>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import formLite from "vue-form-lite";
import { required, minLength, maxLength, email } from "@vue-form-lite/rules";
import auth from "~/api/auth";
import type { IRegister } from "~/interfaces/models/user";

const { register } = await useAuth();

const state = ref<IRegister>({
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
      minLength: minLength(8),
      maxLength: maxLength(255),
    },
  },
});

const errorMessage = ref<string>();

const onSubmit = handleSubmit(async (values: IRegister) => {
  const resErrors = await register(values);

  errorMessage.value = resErrors?.message;
  setErrors(convertValuesToString(resErrors?.errors));
});

useHead({
  title: "Регистрация",
});

definePageMeta({
  layout: "auth",
  middleware: ["no-auth"],
});
</script>

<style lang="scss" scoped>
@import "./../assets/scss/components/auth-form.scss";
</style>
