import useVuelidate, {
  type ExtractState,
  type GlobalConfig,
  type ValidationArgs,
} from "@vuelidate/core";
import type { ToRefs } from "vue";

function useForm<
  T extends { [key in keyof Vargs]: any },
  Vargs extends ValidationArgs = ValidationArgs,
  EState extends ExtractState<Vargs> = ExtractState<Vargs>
>(
  validationsArgs: Ref<Vargs> | Vargs,
  state: T | Ref<T> | ToRefs<T>,
  globalConfig?: GlobalConfig
) {
  const v = useVuelidate(validationsArgs, state, globalConfig);

  watch(
    () => v.value.$errors?.length,
    (errorsLength) => {
      // v.value.$errors
      if (!errorsLength) return;

      v.value.$errors?.forEach((item) => {
        // if (errors.value.find((errorItem) => errorItem[item.$property])) return;
        // if (v.value.$e)
        // errors.value.set(item.$property, item.$message);
        // errors.value.set[item.$property] = item.$message;
      });
    }
  );

  const handleSubmit = (
    successFunction: Function,
    errorFunction?: Function
  ) => {
    return async (e: Event): Promise<void> => {
      e.preventDefault();

      if (await v.value.$validate()) {
        successFunction(state);
        return;
      }

      errorFunction?.(state, v.value.$errors);
    };
  };

  return {
    v,
    handleSubmit,
  };
}

export default useForm;
