import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindCss from 'tailwindcss'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      viteStaticCopy({
        targets: [
          {
            src: 'resources/*', // from: ./resource
            dest: 'resources' // to: ./out/main/resources
          }
        ]
      })
    ]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    define: {
      // Define the process.platform inside renderer process layer
      'process.platform': JSON.stringify(process.platform)
    },
    // Add the tailwindcss plugin to the postcss configuration
    css: {
      postcss: {
        plugins: [
          tailwindCss({
            config: './src/renderer/tailwind.config.js'
          })
        ]
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
