<template>
  <form @submit="submit" class="form" method="POST">
    <input v-model="state.name" />
    <input v-model="state.name1" />
    <input v-model="state.email" />
    <button>123</button>
  </form>
</template>

<script lang="ts" setup>
import type { ErrorObject } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { sameAsFieldWithMessage } from "~/utils/validate/customMessagesWithRules";

const state = ref({
  name: "",
  name1: "",
  email: "",
});

const rules = {
  name: {
    required,
  },
  name1: {
    sameAsField: sameAsFieldWithMessage("name"),
  },
  email: {
    email,
  },
};

const { v, handleSubmit } = useForm(rules, state);

const submit = handleSubmit(
  (a: any) => {
    // console.log(a);
  },
  (values: any, errors: ErrorObject[]) => {
    // console.log(values);
    console.log(errors);
  }
);
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 300px;
}
</style>
