import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src'],
      outDir: 'dist',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        components: resolve(__dirname, 'src/components/index.ts'),
        layout: resolve(__dirname, 'src/layout/index.ts'),
        icons: resolve(__dirname, 'src/icons/index.ts'),
        assets: resolve(__dirname, 'src/assets/index.ts'),
      },
      name: 'STLDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        // Radix UI
        /^@radix-ui\/.*/,
        // DnD Kit
        /^@dnd-kit\/.*/,
        // Utilities
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
        // Icons
        /^lucide-react.*/,
        // Other dependencies
        'sonner',
        'next-themes',
        'react-day-picker',
        /^date-fns.*/,
        'cmdk',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
