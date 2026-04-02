import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      nodePolyfills({
        // 1. Remove the 'include' restriction so it catches all necessary modules
        // OR make sure 'http' and 'https' are added to the list below:
        include: ['path', 'buffer', 'stream', 'process', 'http', 'https', 'util'], 
        
        // 2. Remove 'http' from exclude!
        exclude: [], 

        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        protocolImports: true,
      }),
    ],
    define: {
      'process.env': {},
      // Note: nodePolyfills already handles global, but keeping this is fine
      global: "globalThis",
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        // 3. Add these aliases as a backup for the bundler
        http: 'rollup-plugin-node-polyfills/polyfills/http',
        https: 'rollup-plugin-node-polyfills/polyfills/http',
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});