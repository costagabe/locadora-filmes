<script setup lang="ts">
    import type { SubmitEventPromise } from "vuetify/lib/framework.mjs";
    import Swal from "sweetalert2";

    const supabase = useSupabaseClient();

    const swal = inject<typeof Swal>("$swal");
    const router = useRouter();

    onBeforeMount(async () => {
        const session = await supabase.auth.getSession();

        if (session.data) {
            console.log(`foi aqui`);
            
            router.push("/home");
        }
    });

    definePageMeta({ layout: "auth" });

    const form = reactive({
        email: "",
        password: "",
    });

    const loading = ref(false);

    async function submitForm(e: SubmitEventPromise) {
        loading.value = true;
        try {
            const result = await e;
            if (!result.valid) return;

            const { error } = await supabase.auth.signInWithPassword(form);

            if (!error) {
                router.push("/home");
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
        <v-card-title> <div class="text-h2 my-4">Login</div> </v-card-title>
        <v-card-text>
            <v-form
                class="tw-mt-6"
                @submit.prevent="submitForm"
            >
                <v-text-field
                    v-model="form.email"
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
                    v-model="form.password"
                    :loading="loading"
                    :rules="[required()]"
                    class="tw-mt-5"
                    color="primary"
                    density="compact"
                    label="Senha"
                    type="password"
                    variant="outlined"
                />
                <v-checkbox
                    color="primary"
                    label="Manter-me conectado(a)"
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
                    Login
                </v-btn>

                <v-btn
                    @click="router.push('/signup')"
                    variant="flat"
                    color="secondary"
                    block
                    height="48px"
                    class="text-h6 my-6"
                >
                    Cadastrar-se
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>
