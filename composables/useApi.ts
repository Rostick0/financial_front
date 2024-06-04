// import { api } from "~/api/index.d.ts";
import type api from "~/api";

// import type {} from api
interface iUseApi {
  name: api;
  //   params = {},
  //   filters = {},
  //   unwatchedFilters = {},
  //   requestParams = {},
  //   callback = null,
  init?: boolean;
  //   afterCallback = () => {},
  //   headers = {},
  //   initialValue = null,
  //   afterInit = () => {},
  //   popup = true,
}

function useApi({
  name,
  //   params = {},
  //   filters = {},
  //   unwatchedFilters = {},
  //   requestParams = {},
  //   callback = null,
  init = false,
}: //   afterCallback = () => {},
//   headers = {},
//   initialValue = null,
//   afterInit = () => {},
//   popup = true,
iUseApi) {
  const id = lodashUniqueId();
  const data = useState(`data-${id}`, () => null);
  const loading = useState(`loading-${id}`, () => false);
  const error = useState(`error-${id}`, () => false);
  const meta = useState(`meta-${id}`, () => []);
  const [apiName, apiMethod] = name?.split(".") ?? [null, null];

  return {
    data,
    loading,
    error,
    meta,
  };
}

export default useApi;
