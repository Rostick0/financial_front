import type { typeApi, apiMethods } from "~/api";
import api from "~/api";
import type { initialFiltersItem } from "./useFilter";
// const name = {
// login: () => {},
// };

interface iUseApi {
  // name: `${keyof typeof users}`;
  // ${keyof typeApi}.
  apiName: keyof typeApi;
  apiMethod: keyof apiMethods;
  params?: object;
  filters?: globalThis.Ref<initialFiltersItem>;
  //   unwatchedFilters = {},
  //   requestParams = {},
  //   callback = null,
  init?: boolean;
  afterCallback?: Function;
  headers?: HeadersInit;
  //   initialValue = null,
  afterInit?: Function;
  popup?: boolean;
}

export default async <T>({
  apiName,
  apiMethod,
  params = {},
  filters,
  //   unwatchedFilters = {},
  //   requestParams = {},
  //   callback = null,
  init = false,
  afterCallback = () => {},
  headers = {},
  //   initialValue = null,
  afterInit = () => {},
  popup = true,
}: iUseApi) => {
  const id = lodashUniqueId();
  const data = useState<T[] | null>(`data-${id}`, () => null);
  const isLoading = useState<boolean | null>(`loading-${id}`, () => null);
  const error = useState(`error-${id}`, () => false);
  const meta = useState(`meta-${id}`, () => []);

  const get = async (
    rParams: object = {},
    filter: object = {}
  ): Promise<void> => {
    try {
      if (isLoading.value === false) return;
      isLoading.value = false;

      const preParams = {
        // ...requestParams,
        ...rParams,
        params: {
          ...params,
          // ...unwatchedFilters.value,
          ...filters?.value,
          ...filter,
          // signal: signal.value,
        },
      } as { headers?: HeadersInit; params: any };
      if (headers) {
        preParams.headers = headers;
      }

      await api?.[apiName]?.[apiMethod]?.(preParams, headers)?.then(
        async (res: any) => {
          const { data: dataLocal, ...other } = res;

          data.value = dataLocal;
          meta.value = other;
        }
      );

      isLoading.value = true;
    } catch (e) {
      console.error(e);
      isLoading.value = false;
    }
  };

  onMounted(() => {
    if (isReactive(filters?.value)) {
      watch(
        [() => filters?.value],
        async () => {
          await get({ ...params, ...filters });
        },
        { deep: true }
      );
    }
  });

  return {
    data,
    isLoading,
    error,
    meta,
    get,
  };
};

// export default useApi;
