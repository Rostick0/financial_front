import { helpers } from "@vuelidate/validators";

export const sameAsField = (compared: string) =>
  helpers.withParams(
    { type: "sameAsField" },
    (value: string, values: any): boolean => values[compared] === value
  );
