import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import tsConfigPathsPlugin from 'vite-tsconfig-paths'

const tsconfigPaths = tsConfigPathsPlugin({
  projects: [resolve('tsconfig.json')],
})

export default defineConfig({
  main: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
  },
  preload: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './src/renderer/tailwind.config.js',
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
      },
    },
    plugins: [tsconfigPaths, react()],
  },
})
