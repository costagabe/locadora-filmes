import _ from "lodash";

export function useInitialFetch<T extends K, K>(data: Ref<T | null>, target: Ref<K>) {
    watch(
        data,
        (value) => {
            if (value) target.value = _.cloneDeep(value);
        },
        { immediate: true }
    );
}
