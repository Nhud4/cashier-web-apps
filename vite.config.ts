import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis',
  },
  envPrefix: 'REACT_APP_',
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports
      protocolImports: true,
    }),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@configs': path.resolve(__dirname, './src/configs'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@storage': path.resolve(__dirname, './src/storage'),
      '@utils': path.resolve(__dirname, './src/utils'),
      buffer: 'buffer',
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
})
