import { defineConfig, loadEnv } from 'vite'
// import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { paraglideVitePlugin } from '@inlang/paraglide-js'


import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

import tanstackRouter from '@tanstack/router-plugin/vite'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_BASE_URL,
    server: {
      // port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL, // Your Laravel backend URL
          changeOrigin: true, // Ensures the host header is rewritten to the target
          secure: env.VITE_API_SECURE === 'true', // For local HTTP servers (set to true for HTTPS in production)
          rewrite: (path) => path.replace(/^\/api/, ''), // Optional: removes /api prefix if needed
        },
      },
      open: true

    },
    plugins: [
      // devtools(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        strategy: ['url', 'baseLocale'],
      }),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,

      }),

      viteReact({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
      tailwindcss(),

    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "#": resolve(__dirname, "./src"),
      },
    },
  }
}
)


