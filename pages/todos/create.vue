<template>
  <NuxtLayout>
    <template #title>
      <HeaderMain />
    </template>
    <div class="container">
      <form class="todo-mutation" action="" @submit="onSubmit" method="post">
        <SwitchTypeTodo class="todo-mutation__type" v-model="state.type" />
        <FormField
          label="Сумма (RUB)"
          maska="S SS#"
          maskaTokens="S:[0-9]:repeated"
          maskaReversed
          v-model="state.price"
          :error="v.$errors?.find((i) => i.$property === 'price')?.$message"
        />
        <FormDatepicker
          label="Дата"
          v-model="state.date"
          :error="v.$errors?.find((i) => i.$property === 'date')?.$message"
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
          :type="EnumCategoryType[state.type]"
        />
        <UiButton class="todo-mutation__btn">Сохранить</UiButton>
      </form>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { ErrorObject } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import api from "~/api";
import type { TypeCategory } from "~/interfaces/models/category";
import { EnumCategoryType } from "~/interfaces/models/category";
// import { sameAsFieldWithMessage } from "~/utils/validate/customMessagesWithRules";

// const { data } = await useApi({
//   apiName: "categories",
//   apiMethod: "getAll",
//   init: true,
// });

interface ITodoMutation {
  type: TypeCategory;
  title: string | null;
  description?: string | null;
  price: number | null;
  date: any;
  categoryId: number | null;
}

const state = ref<ITodoMutation>({
  type: "Expenses",
  title: null,
  description: null,
  price: 42312,
  date: new Date(),
  categoryId: null,
});

// Object.keys(EnumCategoryType)
//   .map((k: any) => EnumCategoryType[k])
//   .indexOf(state.value.type);
// console.log(
//   Object.keys(EnumCategoryType)
//     .map((k: any) => EnumCategoryType[k])
//     .indexOf(state.value.type)
// );
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
  async (a: Ref<ITodoMutation>) => {
    console.log(a.value);

    // await api.todos.create({data: a.value})
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
  row-gap: 16px;

  // &__sum {

  //   &_inpu {

  //   }
  // }

  &__type {
    justify-content: center;
  }

  &__btn {
    margin: 0 auto;
    position: sticky;
    bottom: 16px;
  }
}
</style>
