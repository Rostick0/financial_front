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
        <UiButton class="todo-mutation__btn">Сохранить</UiButton>
      </form>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// import formLite from "~/composables/useMyForm";
import formLite from "vue-form-lite";

import type { ErrorObject } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
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

interface ITodoMutation {
  type: TypeCategory;
  title: string | null;
  description: string | null;
  sum: string | null;
  date: any;
  categoryId: number | null;
}

const state = ref<ITodoMutation>({
  type: "Expenses",
  title: null,
  description: null,
  sum: 42312 + "",
  date: new Date(),
  categoryId: null,
});

const rules = {
  type: {},
  title: {
    // api: () => true,
  },
  description: {},
  sum: {
    required,
    minValue: minValue(10),
  },
  date: {},
  categoryId: {},
  //   email: {
  //     email,
  //   },
};
// const { v, handleSubmit } = useForm(rules, state);

const aboba = (a: any) => {
  return (val: any) => (val ? true : "Абоба");
};

const { errors, handleSubmit } = formLite({
  state,
  rules: {
    sum: {
      required: aboba(20),
    },
  },
});

const onSubmit = handleSubmit(async (val: ITodoMutation) => {
  console.log(val);
});

// console.log(v);
// const onSubmit = handleSubmit(
//   lodashDebounce(async (values: Ref<ITodoMutation>) => {
//     const { sum, date, ...other } = values.value;

//     const res = await api.todos.create({
//       data: {
//         sum: sum?.replace(/ /g, ""),
//         // date: moment(date).toISOString().split("T")[0],
//         ...other,
//       },
//     });

//     if (res?.isError) {
//       console.log(5);
//       // warningPopup(res?.errorResponse?.data?.title);
//       return;
//     }

//     // v.value.$validate()
//   }, 400),
//   (values: ITodoMutation, errors: ErrorObject[]) => {
//     console.log(v.value.$errors);

//     v.value.$errors.push({
//       $propertyPath: "title",
//       $property: "title",
//       $validator: "api",
//       $uid: "title-api",
//       $message: "Value is required",
//       $params: {
//         type: "api",
//       },
//       $response: false,
//       $pending: false,
//     } as ErrorObject);

//     // v.value.$errors.filter((item) => item.$uid.endsWith("-api"));
//     // console.log((v.value.title.$externalResults));
//   }
// );
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
