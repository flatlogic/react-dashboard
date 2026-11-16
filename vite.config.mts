import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/',
    server: {
      port: 3000,
      open: false,
      proxy: {
        '/login': { target: 'http://127.0.0.1:5000', bypass: (req) => req.method === 'GET' ? '/index.html' : undefined },
        '/logout': 'http://127.0.0.1:5000',
        '/session': 'http://127.0.0.1:5000',
        '/graphql': 'http://127.0.0.1:5000',
      },
    },
    preview: {
      port: 4173,
    },
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/recharts')) {
              return 'charts-vendor';
            }

            if (id.includes('node_modules/@react-google-maps/api')) {
              return 'maps-vendor';
            }

            if (id.includes('node_modules/react-bootstrap-icons')) {
              return 'icons-vendor';
            }

            if (id.includes('node_modules/react-toastify')) {
              return 'toast-vendor';
            }

            if (id.includes('node_modules/reactstrap') || id.includes('node_modules/@popperjs/core')) {
              return 'ui-vendor';
            }

            if (id.includes('node_modules/@reduxjs/toolkit') || id.includes('node_modules/react-redux')) {
              return 'state-vendor';
            }

            if (id.includes('node_modules/react-router') || id.includes('node_modules/react-router-dom')) {
              return 'router-vendor';
            }

            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-vendor';
            }
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
      globals: true,
    },
  };
});
