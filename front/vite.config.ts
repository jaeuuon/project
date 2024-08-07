import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    css: {
        modules: { localsConvention: 'camelCase' },
        preprocessorOptions: {
            scss: { additionalData: '@use "./src/assets/styles/variables" as var;' }
        }
    },
    server: {
        proxy: {
            '/apis': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    }
});
