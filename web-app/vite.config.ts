import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        middlewareMode: true, // Enable middleware mode for SSR
        proxy: {
            '/api': 'http://localhost:3000' // Proxy API requests to H3 server
        }
    }
});
