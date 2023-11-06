import { serverSupabaseServiceRole } from "#supabase/server";
import { SignupData } from "~/src/types/SignUpData";

export default defineEventHandler(async (event) => {
    const body = await readBody<SignupData>(event);
    const exists = await prisma.user.findFirst({ where: { email: body.user.email } });
    
    const supabase = serverSupabaseServiceRole(event);

    if (exists) {
        throw createError({
            status: 400,
            message: "Email já existe",
        });
    }
    try {
        const clientRole = await prisma.role.findFirstOrThrow({ where: { name: "CLIENT" } });
        const createdUser = await prisma.user.create({
            data: {
                email: body.user.email,
                provider: "email",
                providerId: body.id,
                password: body.user.password,
                roleId: clientRole.id,
                person: {
                    create: {
                        firstName: body.person.firstName,
                        lastName: body.person.lastName,
                        phoneNumber: body.person.phoneNumber,
                        address: {
                            create: {
                                street: body.address.street,
                                city: body.address.city,
                                state: body.address.state,
                                zipCode: body.address.zipCode,
                                number: body.address.number,
                            },
                        },
                    },
                },
            },
        });
        return createdUser;
    } catch (e) {
        await supabase.auth.admin.deleteUser(body.id);

        throw createError({
            status: 500,
            message: "Erro ao criar usuário",
        });
    }
});
