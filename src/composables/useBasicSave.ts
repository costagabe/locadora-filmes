import type { NitroFetchRequest } from "nitropack";
import type { Entity } from "../types/entity";
import Swal from "sweetalert2";

type Methods = "POST" | "PUT";

export function useBasicSave<T extends Entity>(url: NitroFetchRequest, body: Ref<T>, method: Methods) {
    const swal = inject<typeof Swal>("$swal");

    async function save() {
        try {
            await $fetch(`${url}/${body.value.id ?? ""}`, {
                method: method,
                body: body.value,
            });
            swal?.fire("Success", "Movie saved successfully", "success");
        } catch (e) {
            swal?.fire("Error", "Movie could not be saved", "error");
        }
    }
    return { save }
}
