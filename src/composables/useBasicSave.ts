import type { NitroFetchRequest } from "nitropack";
import type { Entity } from "../types/entity";
import Swal from "sweetalert2";

type Methods = "POST" | "PUT";
export async function useBasicSave<T extends Entity>(url: NitroFetchRequest, body: T, method: Methods) {
    const swal = inject<typeof Swal>("$swal");

    try {
        await $fetch(`${url}/${body.id}`, {
            method: "POST",
            body: body,
        });
        swal?.fire("Success", "Movie saved successfully", "success");
    } catch (e) {
        swal?.fire("Error", "Movie could not be saved", "error");
    }
}
