export const useUserStore = defineStore("user", () => {
    const supabase = useSupabaseClient();
    const supabaseId = ref<string | null>(null);

    const personStore = storeToRefs(usePersonStore());

    const { data: user, error: userError } = useFetch("/api/users", {
        query: { supabaseId },
        method: "get",
        key: "user",
    });

    onMounted(async () => {
        const { data, error } = await supabase.auth.getUser();

        if (!error) {
            const { id } = data.user;
            supabaseId.value = id;
        }
    });

    watch(user, (value) => {
        if (!value) return;
        personStore.person.value = value.person;
    });

    return {
        user,
    };
});
