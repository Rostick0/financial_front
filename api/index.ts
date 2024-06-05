import users from "./modules/users";

type apiNames = "users";

interface apiMethods {
  get?: (...args: Array<any>) => Promise<any>;
  getAll?: (...args: Array<any>) => Promise<any>;
  create?: (...args: Array<any>) => Promise<any>;
  update?: (...args: Array<any>) => Promise<any>;
  delete?: (...args: Array<any>) => Promise<any>;
}

type typeApi = Record<apiNames, apiMethods>;

// Record<apiMethods, (...args: Array<any>) => Promise<any>>
// [_: apiMethods]: (...args: Array<any>) => Promise<any> | never;
const api: typeApi = {
  // auth,
  users,
};

export { api as default, type typeApi, type apiMethods };
