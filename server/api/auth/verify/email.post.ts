export default defineEventHandler(async (event) => {
    const body = await readBody<{ email: string }>(event);

    const { email } = body;
    const found = await prisma.user.findFirst({ where: { email } });
    if (found || !email) {
        throw createError({
            status: 400,
            message: "Email já existe",
        });
    }
    return true;
});
