import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
  build: {
    outDir: 'build',
  },
  server: {
    host: true,  // ← add this
    watch: {
      usePolling: true,
      interval: 1000,  // ← add this
    },
    hmr: true,
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
})