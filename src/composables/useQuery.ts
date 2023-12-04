import type { QueryParams } from "../types/queryParams";

export function useQuery<T>(initialSort: string & keyof T) {
    const route = useRoute();
    const router = useRouter();

    const query = reactive<QueryParams<T>>({
        page: Number(route.query.page ?? 1),
        perPage: Number(route.query.perPage ?? 10),
        sortBy: (route.query.sortBy as unknown as string & keyof T) ?? initialSort,
        search: (route.query.search as string) ?? "",
    });

    watch(
        query,
        () => {
            router.push({ query });
        },
        { immediate: true, deep: true }
    );

    return query;
}
