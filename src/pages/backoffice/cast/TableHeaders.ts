import type { Movie } from "@prisma/client";
import type { DataTableHeader } from "~/src/types/dataTableHeader";

export const genresHeaders: DataTableHeader[] = [
    { title: "Nome", key: "name" },
    {
        title: "Ações",
        key: "actions",
        width: "120px",
        value: (movie: Movie) => movie,
        align: "center",
    },
];
