import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { name, version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), visualizer({ filename: 'results/stats.html' })],

    define: {
        APP_NAME: JSON.stringify(name),
        APP_VERSION: JSON.stringify(version),
    },

    build: {
        outDir: 'build',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor.common': ['@sentry/browser', 'framer-motion', 'oidc-client-ts'],
                },
            },
        },
    },

    server: {
        host: '127.0.0.1',
        port: 3000,
        fs: {
            strict: false,
        },
    },

    test: {
        environment: 'jsdom',
        globals: true,
        globalSetup: 'src/__test__/globalSetup.ts',
        setupFiles: 'src/__test__/setupTests.ts',
        include: ['**/__test__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
});
