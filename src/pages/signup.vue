<script setup lang="ts">
    import type { SubmitEventPromise } from "vuetify/lib/framework.mjs";
    import Swal from "sweetalert2";
    import { phone } from "../utils/rules";
    import { VStepper } from "vuetify/labs/VStepper";
    import type { SignupData } from "../types/SignUpData";

    const steps = ["Dados de usuário", "Dados pessoais", "Endereço"];

    const supabase = useSupabaseClient();

    const swal = inject<typeof Swal>("$swal");

    const router = useRouter();

    const loading = ref(false);

    const numberMaskOptions = { mask: "(##) #####-####" };
    const cepMaskOptions = { mask: "#####-###" };

    const stepperModel = ref(1);

    definePageMeta({ layout: "auth" });

    const form = ref<SignupData>({
        id: "",
        user: {
            email: "",
            password: "",
        },
        person: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
        },
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            number: "",
        },
    });

    async function handleCreateUser(id: string) {
        const { data, error } = await useFetch("/api/auth/signup", {
            method: "POST",
            body: form,
        });

        if (error.value) {
            swal?.fire({
                icon: "error",
                title: "Oops...",
                text: error.value?.message + "...erro",
            });
            return;
        }

        swal?.fire({
            icon: "success",
            title: "Success!",
            text: "Verifique seu email para confirmar sua conta",
        });
        router.push("/home");
    }

    async function submitForm(e: SubmitEventPromise) {
        loading.value = true;
        try {
            const result = await e;
            if (!result.valid) {
                swal?.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Preencha todos os campos",
                });
                return;
            }

            const { data: userData, error } = await supabase.auth.signUp({
                email: form.value.user.email,
                password: form.value.user.password,
            });

            if (!error) {
                const id = userData.user!.id;
                await handleCreateUser(id);
            } else {
                swal?.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            }
        } finally {
            loading.value = false;
        }
    }
</script>

<template>
    <v-card class="text-h1 tw-bg-slate-950 tw-bg-opacity-80 tw-rounded-lg tw-text-center">
        <v-card-title> <div class="text-h2">Sign In</div> </v-card-title>
        <v-card-text>
            <v-form
                class="tw-mt-6"
                @submit.prevent="submitForm"
            >
                <v-stepper
                    alt-labels
                    :items="steps"
                    :model-value="stepperModel"
                    prev-text="Voltar"
                    next-text="Próximo"
                >
                    <template v-slot:item.1>
                        <v-text-field
                            v-model="form.user.email"
                            :loading="loading"
                            :rules="[required(), email()]"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="Email"
                            type="email"
                            variant="outlined"
                        />
                        <v-text-field
                            v-model="form.user.password"
                            :loading="loading"
                            :rules="[required()]"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="Senha"
                            type="password"
                            variant="outlined"
                        />
                    </template>

                    <template v-slot:item.2>
                        <v-text-field
                            v-model="form.person.firstName"
                            :loading="loading"
                            :rules="[required()]"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="Nome"
                            variant="outlined"
                        />
                        <v-text-field
                            v-model="form.person.lastName"
                            :loading="loading"
                            :rules="[required()]"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="Sobrenome"
                            variant="outlined"
                        />
                        <v-text-field
                            v-model="form.person.phoneNumber"
                            :loading="loading"
                            :rules="[required(), phone()]"
                            v-maska:[numberMaskOptions]
                            ref="numberMask"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="Telefone"
                            variant="outlined"
                        />
                    </template>

                    <template v-slot:item.3>
                        <v-text-field
                            v-model="form.address.zipCode"
                            :loading="loading"
                            v-maska:[cepMaskOptions]
                            :rules="[required()]"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="CEP"
                            variant="outlined"
                        />
                        <v-text-field
                            v-model="form.address.number"
                            :loading="loading"
                            :rules="[required()]"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="Número"
                            variant="outlined"
                        />
                        <v-text-field
                            v-model="form.address.street"
                            :loading="loading"
                            :rules="[required()]"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="Rua"
                            variant="outlined"
                        />
                        <v-text-field
                            v-model="form.address.city"
                            :loading="loading"
                            :rules="[required()]"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="Cidade"
                            variant="outlined"
                        />
                        <v-text-field
                            v-model="form.address.state"
                            :loading="loading"
                            :rules="[required()]"
                            class="tw-mt-5"
                            color="primary"
                            density="compact"
                            label="Estado"
                            variant="outlined"
                        />
                        <v-btn
                            :loading="loading"
                            block
                            class="text-h6"
                            color="primary"
                            height="48px"
                            type="submit"
                            variant="flat"
                        >
                            Sign Up
                        </v-btn>
                    </template>
                </v-stepper>
            </v-form>
        </v-card-text>
    </v-card>
</template>
