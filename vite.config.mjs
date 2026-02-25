import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from "vite-plugin-html";

export default defineConfig({
    server: {
        port: 3001,
    },
    plugins: [
        react(),
        createHtmlPlugin({
            entry: './demo/index.tsx',
            template: './src/layout/template.html',
            inject: {
                data: {
                    title: 'Common UI Demo',
                    injectScript: `<script src="./inject.js"></script>`,
                },
            }
        })
    ],
})