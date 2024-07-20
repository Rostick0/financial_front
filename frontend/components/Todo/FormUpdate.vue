<template>
  <form class="todo-mutation" @submit="onSubmit" method="post">
    <SwitchTypeTodo
      class="todo-mutation__type"
      v-model="state.Type"
      :error="errors.Type"
    />
    <FormField
      label="Сумма (RUB)"
      maska="S SS#"
      maskaTokens="S:[0-9]:repeated"
      maskaReversed
      v-model="state.Sum"
      :error="errors.Sum"
    />
    <FormDatepicker label="Дата" v-model="state.Date" :error="errors.Date" />
    <FormField label="Название" v-model="state.Title" :error="errors.Title" />
    <FormTextarea
      label="Описание"
      v-model="state.Description"
      :error="errors.Description"
    />
    <FormCategoriesSelect
      v-model="state.CategoryId"
      :type="EnumCategoryType[state.Type]"
      :error="errors.CategoryId"
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

const { data } = defineProps<{
  data: ITodoView;
}>();

const user = useState<IUser>("user");

const state = ref<ITodoMutation>({
  Type: EnumCategoryType[data.category?.type as number] as TypeCategory,
  Title: data.title,
  Description: data.description,
  Sum: data.sum?.toString(),
  Date: new Date(data.date),
  CategoryId: data.categoryId,
  // Img: null,
});

const { errors, handleSubmit, setErrors, clearErrors } = formLite({
  state,
  rules: {
    Type: {
      required,
    },
    Title: {
      maxLength: maxLength(50),
    },
    Description: {
      maxLength: maxLength(255),
    },
    Sum: {
      required,
    },
    Date: {
      required,
    },
    CategoryId: {
      required,
    },
  },
});

const onSubmit = handleSubmit(async (values: ITodoMutation) => {
  const { Sum: sum, Date: date, ...other } = values;
  const sumNum = parseFloat(sum?.replace(/ /g, "") as string);

  const res = await api.todos.update?.({
    id: data.id,
    data: {
      Sum: sumNum,
      Date: getDate(date),
      ...other,
    },
  });

  if (res?.isError) {
    setErrors(convertValuesToString(res?.errorResponse?.data?.errors));
    warningPopup(res?.errorResponse?.data?.title);
    return;
  }

  const sumOldNum = parseFloat(
    data.sum.toString()?.replace(/ /g, "") as string
  );

  user.value.balance +=
    ((EnumCategoryType[data.category?.type as number] as TypeCategory) ===
    "Expenses"
      ? sumOldNum
      : sumOldNum * -1) + (values.Type === "Expenses" ? sumNum * -1 : sumNum);

  nextTick(() => {
    navigateTo("/");
  });
});
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/components/todo-mutation.scss";
</style>
