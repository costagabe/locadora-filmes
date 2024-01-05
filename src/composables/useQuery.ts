import type { QueryParams } from "../types/queryParams";

export function useQuery<T>(initialSort: string & keyof T) {
    const route = useRoute();
    const router = useRouter();

    const query = reactive<QueryParams<T>>({
        page: Number(route.query.page ?? 1),
        perPage: Number(route.query.perPage ?? 10),
        sortBy: (route.query.sortBy as string & keyof T) ?? initialSort,
        sortOrder: "asc",
        search: (route.query.search as string) ?? "",
    });

    watch(
        query,
        () => {
            router.push({ query });
        },
        { immediate: true, deep: true }
    );

    const sortBy = computed({
        get() {
            return [{ key: query.sortBy, order: query.sortOrder }];
        },
        set(value) {
            if (value && value[0]) {
                query.sortBy = value[0].key;
                query.sortOrder = value[0].order;
            }
        },
    });

    function loadItem(options: any) {
        if (options.sortBy?.[0]) {
            query.sortBy = options.sortBy[0].key;
            query.sortOrder = options.sortBy[0].order;
        }
    }

    return { query, sortBy, loadItem };
}
