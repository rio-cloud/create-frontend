import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), visualizer({ filename: 'results/stats.html' })],

    define: {
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
        port: 3000,
    },

    test: {
        environment: 'happy-dom',
        globals: true,
        globalSetup: 'src/__test__/globalSetup.ts',
        setupFiles: 'src/__test__/setupTests.ts',
        restoreMocks: true,
        include: ['**/__test__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

        server: {
            deps: {
                inline: [
                    // inline all our components that are potentially ESM-only until the UIKIT is fully 100% ESM-only
                    '@rio-cloud/rio-notifications-component',
                    '@rio-cloud/rio-session-expired-info',
                    '@rio-cloud/rio-uikit',
                    '@rio-cloud/rio-user-menu-component',
                ],
            },
        },

        // Vitest by default uses 'test' as the mode. There is no .env file for
        // this mode. Therefore, we load the environment variables from the
        // development mode instead.
        env: loadEnv('development', process.cwd()),
    },
});
