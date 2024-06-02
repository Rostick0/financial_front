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

  const handleSubmit = (
    successFunction: Function,
    errorFunction?: Function
  ) => {
    return async (e: Event) => {
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
