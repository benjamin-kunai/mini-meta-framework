import { defineConfig, Plugin } from 'vite';
import metaFramework from '@mini-meta-framework/vite-plugin'

export default defineConfig({
    server: {
        ws: false,
        port: undefined

    },
    plugins: [metaFramework()]
});

