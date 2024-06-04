import auth from "./modules/auth";
type api = "auth";
// "users" | "dsa"
type apiItem = Record<string, (...args: Array<any>) => Promise<any>>;

const api: Record<api, apiItem> = {
  auth,
};

export { api as default, type api, type apiItem };
