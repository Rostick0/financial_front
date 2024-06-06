import type { typeApi, apiMethods } from "~/api";
import api from "~/api";
// const name = {
// login: () => {},
// };

interface iUseApi {
  // name: `${keyof typeof users}`;
  // ${keyof typeApi}.
  apiName: keyof typeApi;
  apiMethod: keyof apiMethods;
  //   params = {},
  //   filters = {},
  //   unwatchedFilters = {},
  //   requestParams = {},
  //   callback = null,
  init?: boolean;
  afterCallback?: Function;
  // headers: HeadersInit;
  //   initialValue = null,
  afterInit?: Function;
  popup?: boolean;
}

export default async ({
  apiName,
  apiMethod,
  //   params = {},
  //   filters = {},
  //   unwatchedFilters = {},
  //   requestParams = {},
  //   callback = null,
  init = false,
  afterCallback = () => {},
  // headers = {},
  //   initialValue = null,
  afterInit = () => {},
  popup = true,
}: iUseApi) => {
  const id = lodashUniqueId();
  const data = useState(`data-${id}`, () => null);
  const isLoading = useState<boolean | null>(`loading-${id}`, () => null);
  const error = useState(`error-${id}`, () => false);
  const meta = useState(`meta-${id}`, () => []);

  const get = async (): Promise<void> => {
    try {
      console.log(isLoading.value);
      if (isLoading.value === false) return;
      isLoading.value = false;

      await api?.[apiName]?.[apiMethod]?.(preParams, headers)?.then(
        async (res: any) => {
          // await getMeta(res);
          // return res;
        }
      );
      isLoading.value = true;
    } catch (e) {
      console.error(e);
      isLoading.value = false;
    }
  };

  return {
    data,
    isLoading,
    error,
    meta,
    get,
  };
};

// export default useApi;
