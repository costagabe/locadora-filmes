const movies = [
    {
        id: 1,
        title: "Filme 1",
        description: "Descrição do filme 1",
        year: 2021,
        duration: 120,
    },
    {
        id: 2,
        title: "Filme 2",
        description: "Descrição do filme 2",
        year: 2021,
        duration: 120,
    },
    {
        id: 3,
        title: "Filme 3",
        description: "Descrição do filme 3",
        year: 2021,
        duration: 120,
    },
];

export default defineEventHandler(async (event) => {
    return (await prisma.movie.findMany()).map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        releaseDate: movie.releaseDate.toLocaleDateString(),
        duration: 120,
    }));
});
