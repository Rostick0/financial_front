type initialFiltersItem = Record<string, string> | undefined;

interface useFilterArguments {
  initialFilters?: initialFiltersItem;
  withQueryParams?: boolean;
  withInitQueryParams?: boolean;
  debounceMs?: number;
}

export default ({
  initialFilters = {},
  withQueryParams = true,
  withInitQueryParams = true,
  debounceMs = 500,
}: // debounceMs
useFilterArguments = {}) => {
  const id = lodashUniqueId();
  const router = useRouter();
  const filters = useState<initialFiltersItem>(
    "filters-" + id,
    () => initialFilters
  );

  if (withInitQueryParams) {
    onMounted(() => {
      const params: initialFiltersItem = useRoute().query as initialFiltersItem;

      filters.value = {
        ...filters.value,
        ...params,
      };
    });
  }

  const resetFilterValues = (): void => {
    filters.value = {};

    if (withQueryParams) router.replace({ query: {} });
  };

  const urlSerachParams = computed((): string =>
    filters.value ? "?" + new URLSearchParams(filters.value).toString() : ""
  );

  watch(
    () => lodashCloneDeep(filters.value),
    lodashDebounce((newVal) => {
      if (withQueryParams)
        router.replace({
          query: lodashPickBy(
            newVal,
            (value) => value !== "" && value !== null && value !== undefined
          ),
        });
    }, debounceMs)
  );

  return {
    filters,
    // updateCurrentFilterValue,
    resetFilterValues,
    urlSerachParams,
  };
};
