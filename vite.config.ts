import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueTsx from 'vite-plugin-ts'
import { fileURLToPath } from 'url'
// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    plugins: command === 'build' ? [] : [vue(), vueTsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            packages: fileURLToPath(new URL('./packages', import.meta.url))
        }
    },
    build: {
        target: 'es2015',
        lib: {
            entry: 'packages/index.ts',
            name: 'evil-vue',
            fileName: (format) => `evil-vue.${format}.js`,
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['vue']
        },
        minify: false
    }
}))
