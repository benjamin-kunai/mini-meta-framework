// TODO: Fix import to work without .js extension
import { Plugin } from 'vite';
import { initializeDevServer } from './server.js';

// Keep track of whether we've initialized the server already
let serverInitialized = false;

export const metaFramework = (): Plugin => {
    return {
        name: 'vite-plugin-meta-framework',
        
        configResolved(config) {
            // console.log('Meta Framework Plugin - Config Resolved:', config);
        },

        configureServer(server) {
            if (!serverInitialized) {
                console.log('Initializing dev server via plugin');
                // Initialize server only once
                initializeDevServer();
                serverInitialized = true;
            } else {
                console.log('Server already initialized, skipping');
            }
        }
    }
}

export default metaFramework; 