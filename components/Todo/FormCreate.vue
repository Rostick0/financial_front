<template>
  <form class="todo-mutation" @submit="onSubmit" method="post">
    <SwitchTypeTodo
      class="todo-mutation__type"
      v-model="state.type"
      :error="errors.type"
    />
    <FormField
      label="Сумма (RUB)"
      maska="S SS#"
      maskaTokens="S:[0-9]:repeated"
      maskaReversed
      v-model="state.sum"
      :error="errors.sum"
    />
    <FormDatepicker label="Дата" v-model="state.date" :error="errors.date" />
    <FormField label="Название" v-model="state.title" :error="errors.title" />
    <FormTextarea
      label="Описание"
      v-model="state.description"
      :error="errors.description"
    />
    <FormCategoriesSelect
      v-model="state.categoryId"
      :type="EnumCategoryType[state.type]"
      :error="errors.categoryId"
    />
    <UiButton class="todo-mutation__btn">Сохранить</UiButton>
  </form>
</template>

<script lang="ts" setup>
import formLite from "vue-form-lite";
import { maxLength, required } from "@vue-form-lite/rules";
import api from "~/api";
import { EnumCategoryType } from "~/interfaces/models/category";
import type { ITodoMutation } from "~/interfaces/models/todo";

const user = useState<IUser>("user");

const state = ref<ITodoMutation>({
  type: "Expenses",
  title: null,
  description: null,
  sum: null,
  date: new Date(),
  categoryId: null,
  img: null,
});

const { errors, handleSubmit, setErrors } = formLite({
  state,
  rules: {
    type: {
      required,
    },
    title: {
      maxLength: maxLength(255),
    },
    description: {
      maxLength: maxLength(255),
    },
    sum: {
      required,
    },
    date: {
      required,
    },
    categoryId: {
      required,
    },
  },
});

const onSubmit = handleSubmit(async (values: ITodoMutation) => {
  const { sum, date, ...other } = values;
  const sumNum = parseFloat(sum?.replace(/ /g, "") as string);

  const res = await api.todos.create?.({
    data: {
      sum: sumNum,
      date: getDate(date),
      ...other,
    },
  });

  if (res?.isError) {
    setErrors(res?.errorResponse?.data?.errors);
    // warningPopup(res?.errorResponse?.data?.title);
    return;
  }

  user.value.balance += values.type === "Expenses" ? sumNum * -1 : sumNum;

  nextTick(() => {
    navigateTo("/");
  });
});
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/components/todo-mutation.scss";
</style>
