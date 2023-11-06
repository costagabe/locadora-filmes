<script setup lang="ts">
    const supabase = useSupabaseClient();
    const router = useRouter();

    const user = await supabase.auth.getUser();

    async function signOut() {
        await supabase.auth.signOut();
        router.push("/signin");
    }
</script>

<template>
    <v-container>
        <v-row justify="end">
            <v-col cols="auto">
                <v-btn
                    color="primary"
                    @click="signOut"
                    >Sign Out</v-btn
                >
            </v-col>
        </v-row>
        <v-row>
            {{ user.data.user?.id }}
        </v-row>
    </v-container>
</template>
