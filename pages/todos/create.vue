<template>
  <NuxtLayout>
    <div class="container">
      <form class="todo-mutation" action="" @submit="onSubmit" method="post">
        <FormField
          label="Сумма (RUB)"
          maska="S SS#"
          maskaTokens="S:[0-9]:repeated"
          maskaReversed
          v-model="state.price"
          :error="v.$errors?.find((i) => i.$property === 'price')?.$message"
        />
        <FormField
          label="Название"
          v-model="state.title"
          :error="v.$errors?.find((i) => i.$property === 'title')?.$message"
        />
        <FormTextarea
          label="Описание"
          v-model="state.description"
          :error="
            v.$errors?.find((i) => i.$property === 'description')?.$message
          "
        />
        <FormCategoriesSelect
          v-model="state.categoryId"
          :error="
            v.$errors?.find((i) => i.$property === 'categoryId')?.$message
          "
        />
        <UiButton class="todo-mutation__btn">Сохранить</UiButton>
      </form>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { ErrorObject } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
// import { sameAsFieldWithMessage } from "~/utils/validate/customMessagesWithRules";

const { data } = await useApi({
  apiName: "categories",
  apiMethod: "getAll",
  init: true,
});

interface ITodoMutation {
  title: string | null;
  description?: string | null;
  price: number | null;
  categoryId: number | null;
}

const state = ref({
  title: null,
  description: null,
  price: "42312",
  categoryId: null,
});

const rules = {
  price: {
    required,
  },
  //   email: {
  //     email,
  //   },
};

const { v, handleSubmit } = useForm(rules, state);
const onSubmit = handleSubmit(
  (a: Ref<ITodoMutation>) => {
    console.log(a.value);
  },
  (values: ITodoMutation, errors: ErrorObject[]) => {
    console.log(v.value.$errors);
  }
);
</script>

<style lang="scss" scoped>
.todo-mutation {
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  // &__sum {

  //   &_inpu {

  //   }
  // }

  &__btn {
    margin: 0 auto;
    position: sticky;
    bottom: 16px;
  }
}
</style>
