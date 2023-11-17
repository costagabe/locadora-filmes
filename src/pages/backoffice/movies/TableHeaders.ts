import type { Movie } from "@prisma/client";
import type { DataTableHeader } from "~/src/types/dataTableHeader";

export const moviesHeaders: DataTableHeader[] = [
    { title: "Imagem", key: "posterImage", align: "center", width: "80px" },
    { title: "Nome", key: "title" },
    { title: "Descrição", key: "description" },
    { title: "Ano", key: "releaseDate" },
    { title: "Duração", key: "duration" },
    {
        title: "Ações",
        key: "actions",
        value: (movie: Movie) => movie,
        align: "center",
    },
];
