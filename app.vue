<template>
    <v-app
        full-height
        class="tw-bg-slate-600"
        theme="locadoraTheme"
    >
        <NuxtLayout>
            <NuxtLoadingIndicator
                :height="5"
                :throttle="0"
            />
            <NuxtPage />
        </NuxtLayout>
    </v-app>
</template>
