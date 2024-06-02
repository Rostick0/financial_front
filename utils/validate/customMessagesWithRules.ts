import { helpers } from "@vuelidate/validators";
import { sameAsField } from "./customRules";

export const sameAsFieldWithMessage = (compared: string) =>
  helpers.withMessage(
    ({ $property }) => `The ${$property} and ${compared} must match`,
    sameAsField(compared)
  );
