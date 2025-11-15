import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "",
    server: {
        host: 'themayowa.custom',
        port: 5173
    },

    resolve: {
        alias: {
            '@': '/src',
        },
    }
})
