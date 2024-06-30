<template>
  <NuxtLayout>
    <template #title>
      <HeaderMain />
    </template>
    <div class="container">
      <form class="todo-mutation" action="" @submit="onSubmit" method="post">
        <pre>
        <!-- {{ v.$errors }} -->
        {{ errors }}
        </pre>
        <SwitchTypeTodo class="todo-mutation__type" v-model="state.type" />
        <FormField
          label="Сумма (RUB)"
          maska="S SS#"
          maskaTokens="S:[0-9]:repeated"
          maskaReversed
          v-model="state.sum"
        />
        <FormDatepicker label="Дата" v-model="state.date" />
        <FormField label="Название" v-model="state.title" />
        <FormTextarea label="Описание" v-model="state.description" />
        <FormCategoriesSelect
          v-model="state.categoryId"
          :type="EnumCategoryType[state.type]"
        />
        <!-- <input @change="(e) => (state.img = e.target?.files)" type="file" /> -->
        <UiButton class="todo-mutation__btn">Сохранить</UiButton>
      </form>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// import formLite from "~/composables/useMyForm";
import formLite from "vue-form-lite";
// import {} from 'vue-form-lite/src/ru
// import required from "vue-form-lite/src/rules/required.ts";

import type { ErrorObject } from "@vuelidate/core";
import { minValue, email } from "@vuelidate/validators";
import moment from "moment";
import api from "~/api";
import type { TypeCategory } from "~/interfaces/models/category";
import { EnumCategoryType } from "~/interfaces/models/category";
// import { sameAsFieldWithMessage } from "~/utils/validate/customMessagesWithRules";

// const { data } = await useApi({
//   apiName: "categories",
//   apiMethod: "getAll",
//   init: true,
// });

// minValue(20)

interface ITodoMutation {
  type: TypeCategory;
  title: string | null;
  description: string | null;
  sum: string | null;
  date: any;
  categoryId: number | null;
  img?: any;
}

const state = ref<ITodoMutation>({
  type: "Expenses",
  title: null,
  description: null,
  sum: 42312 + "",
  date: new Date(),
  categoryId: null,
  img: null,
});

function required(val: any) {
  let empty = false;

  if (isObject(val)) {
    if (isEmpty(val)) empty = true;
  } else if (Array.isArray(val)) {
    if (val?.length === 0) empty = true;
  } else if ([undefined, null, ""].find((el) => val === el) !== undefined) {
    empty = true;
  }

  return !empty;
}

function between(min: any, max: any) {
  return (val: any) => val >= min && val <= max;
}

const withMessage = (rule: Function, message: string) => {
  return (val: any) => {
    return rule(val) ? true : message;
  };
};

const {
  errors,
  handleSubmit,
  setError,
  setErrors,
  $valid,
  clearError,
  clearErrors,
} = formLite({
  state,
  rules: {
    sum: {
      // required: withMessage(required, 'aboba'),
      // required,
      // between: between(1, 6),
    },
  },
});

const onSubmit = handleSubmit(async (values: ITodoMutation) => {
  const { sum, date, ...other } = values;

  const res = await api.todos.create({
    data: {
      sum: sum?.replace(/ /g, ""),
      date: getDate(date),
      ...other,
    },
  });

  if (res?.isError) {
    console.log(5);
    setErrors(res?.errorResponse?.data?.errors);
    // warningPopup(res?.errorResponse?.data?.title);
    return;
  }

  nextTick(() => {
    navigateTo("/");
  });
});
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
