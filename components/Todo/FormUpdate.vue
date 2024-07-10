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
import {
  EnumCategoryType,
  type TypeCategory,
} from "~/interfaces/models/category";
import type { ITodoMutation, ITodoView } from "~/interfaces/models/todo";

const route = useRoute();
const id = route.params.id as string;

const data: ITodoView = await api.todos.get?.({ id });

if (!data) navigateTo("/404");

const state = ref<ITodoMutation>({
  type: EnumCategoryType[data.category?.type as number] as TypeCategory,
  title: data.title,
  description: data.description,
  sum: data.sum?.toString(),
  date: new Date(data.date),
  categoryId: data.categoryId,
  // img: null,
});

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

  console.log(values);
  const res = await api.todos.update?.({
    id,
    data: {
      sum: sum?.replace(/ /g, ""),
      date: getDate(date),
      ...other,
    },
  });

  if (res?.isError) {
    setErrors(res?.errorResponse?.data?.errors);
    warningPopup(res?.errorResponse?.data?.title);
    return;
  }

  nextTick(() => {
    navigateTo("/");
  });
});
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/components/todo-mutation.scss";
</style>
