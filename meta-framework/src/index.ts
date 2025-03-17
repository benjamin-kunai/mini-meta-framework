import { Plugin } from 'vite';

export const metaFramework = (): Plugin => {
    return {
        name: 'vite-plugin-meta-framework',
        configResolved(config) {
            console.log('Meta Framework Plugin - Config Resolved:', config);
        }
    }
}

export default metaFramework; 