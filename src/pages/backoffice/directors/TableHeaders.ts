import type { Movie } from "@prisma/client";
import type { DataTableHeader } from "~/src/types/dataTableHeader";

export const directorsHeaders: DataTableHeader[] = [
    { title: "Nome", key: "firstName" },
    { title: "Sobrenome", key: "lastName" },
    {
        title: "Ações",
        key: "actions",
        value: (movie: Movie) => movie,
        align: "center",
    },
];
