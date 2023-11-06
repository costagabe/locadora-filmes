import { Person } from "@prisma/client";

export const usePersonStore = defineStore("person", () => {
    const person = ref<Person>();

    const fullName = computed(() =>
        !person.value ? "" : `${person.value.firstName} ${person.value.lastName}`
    );

    return {
        person,
        fullName,
    };
});
