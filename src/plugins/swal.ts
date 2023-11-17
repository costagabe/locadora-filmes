import Swal from "sweetalert2";
import type { SweetAlertOptions } from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

// Default options
const options: SweetAlertOptions = {
    background: "#2d2d2d",
    confirmButtonColor: "#e50914",
    color: "#FFF",
};

const $swal = {
    install: (Vue: any, options: SweetAlertOptions) => {
        Vue.provide("$swal", Swal.mixin(options));
    },
};
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use($swal, options);
});
