// Import environment-specific configurations
import { MasterKeys } from './envConfig';

// Nuxt 3 uses `defineNuxtConfig` for configuration
export default defineNuxtConfig({
    ssr: true,
    
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
        },
    },
    modules: ['@pinia/nuxt'],
    css: [
        "~/assets/scss/global.scss",
    ],
    runtimeConfig: {
        public: {
            appName: process.env.NUXT_APP_NAME || "email manager from config",
            appApiUrl: (MasterKeys[process.env.NODE_ENV as keyof typeof MasterKeys] || MasterKeys.development).apiEndPoint,
            appUrl: (MasterKeys[process.env.NODE_ENV as keyof typeof MasterKeys] || MasterKeys.development).baseUrl,
            nodeEnv: (MasterKeys[process.env.NODE_ENV as keyof typeof MasterKeys] || MasterKeys.development).nodeEnv
        },
    },
});
