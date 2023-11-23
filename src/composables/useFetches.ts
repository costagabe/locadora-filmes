import type { NitroFetchRequest } from 'nitropack'

export function useFetches(urls: NitroFetchRequest[]) {
    const fetches = urls.map((url) => useFetch(url));
    return fetches.map(fetch => computed(() => fetch.data))
}
