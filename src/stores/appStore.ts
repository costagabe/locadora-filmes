export const useAppStore = defineStore("app", () => {
    const value = ref(0);
    return {
        value,
    };
});
