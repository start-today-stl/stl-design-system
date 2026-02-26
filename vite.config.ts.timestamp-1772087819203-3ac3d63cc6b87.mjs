// vite.config.ts
import { defineConfig } from "file:///Users/yugyeong.kim/Documents/dev/stl-design-system/node_modules/vite/dist/node/index.js";
import react from "file:///Users/yugyeong.kim/Documents/dev/stl-design-system/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///Users/yugyeong.kim/Documents/dev/stl-design-system/node_modules/@tailwindcss/vite/dist/index.mjs";
import dts from "file:///Users/yugyeong.kim/Documents/dev/stl-design-system/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __vite_injected_original_import_meta_url = "file:///Users/yugyeong.kim/Documents/dev/stl-design-system/vite.config.ts";
var __dirname = dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ["src"],
      outDir: "dist"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        components: resolve(__dirname, "src/components/index.ts"),
        layout: resolve(__dirname, "src/layout/index.ts"),
        icons: resolve(__dirname, "src/icons/index.ts"),
        assets: resolve(__dirname, "src/assets/index.ts")
      },
      name: "STLDesignSystem",
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "mjs" : "cjs"}`
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        // Radix UI
        /^@radix-ui\/.*/,
        // DnD Kit
        /^@dnd-kit\/.*/,
        // Utilities
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
        // Icons
        /^lucide-react.*/,
        // Other dependencies
        "sonner",
        "next-themes",
        "react-day-picker",
        /^date-fns.*/,
        "cmdk"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
        preserveModules: true,
        preserveModulesRoot: "src"
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveXVneWVvbmcua2ltL0RvY3VtZW50cy9kZXYvc3RsLWRlc2lnbi1zeXN0ZW1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95dWd5ZW9uZy5raW0vRG9jdW1lbnRzL2Rldi9zdGwtZGVzaWduLXN5c3RlbS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveXVneWVvbmcua2ltL0RvY3VtZW50cy9kZXYvc3RsLWRlc2lnbi1zeXN0ZW0vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgeyByZXNvbHZlLCBkaXJuYW1lIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdGFpbHdpbmRjc3MoKSxcbiAgICBkdHMoe1xuICAgICAgaW5jbHVkZTogWydzcmMnXSxcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgICAgY29tcG9uZW50czogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cy9pbmRleC50cycpLFxuICAgICAgICBsYXlvdXQ6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xheW91dC9pbmRleC50cycpLFxuICAgICAgICBpY29uczogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaWNvbnMvaW5kZXgudHMnKSxcbiAgICAgICAgYXNzZXRzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMvaW5kZXgudHMnKSxcbiAgICAgIH0sXG4gICAgICBuYW1lOiAnU1RMRGVzaWduU3lzdGVtJyxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCwgZW50cnlOYW1lKSA9PiBgJHtlbnRyeU5hbWV9LiR7Zm9ybWF0ID09PSAnZXMnID8gJ21qcycgOiAnY2pzJ31gLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAgICdyZWFjdC9qc3gtcnVudGltZScsXG4gICAgICAgIC8vIFJhZGl4IFVJXG4gICAgICAgIC9eQHJhZGl4LXVpXFwvLiovLFxuICAgICAgICAvLyBEbkQgS2l0XG4gICAgICAgIC9eQGRuZC1raXRcXC8uKi8sXG4gICAgICAgIC8vIFV0aWxpdGllc1xuICAgICAgICAnY2xzeCcsXG4gICAgICAgICd0YWlsd2luZC1tZXJnZScsXG4gICAgICAgICdjbGFzcy12YXJpYW5jZS1hdXRob3JpdHknLFxuICAgICAgICAvLyBJY29uc1xuICAgICAgICAvXmx1Y2lkZS1yZWFjdC4qLyxcbiAgICAgICAgLy8gT3RoZXIgZGVwZW5kZW5jaWVzXG4gICAgICAgICdzb25uZXInLFxuICAgICAgICAnbmV4dC10aGVtZXMnLFxuICAgICAgICAncmVhY3QtZGF5LXBpY2tlcicsXG4gICAgICAgIC9eZGF0ZS1mbnMuKi8sXG4gICAgICAgICdjbWRrJyxcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxuICAgICAgICB9LFxuICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXG4gICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6ICdzcmMnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJVLFNBQVMsb0JBQW9CO0FBQ3hXLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxTQUFTLGVBQWU7QUFDakMsU0FBUyxxQkFBcUI7QUFMZ0wsSUFBTSwyQ0FBMkM7QUFPL1AsSUFBTSxZQUFZLFFBQVEsY0FBYyx3Q0FBZSxDQUFDO0FBRXhELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLElBQUk7QUFBQSxNQUNGLFNBQVMsQ0FBQyxLQUFLO0FBQUEsTUFDZixRQUFRO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLFdBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLFdBQVcsY0FBYztBQUFBLFFBQ3hDLFlBQVksUUFBUSxXQUFXLHlCQUF5QjtBQUFBLFFBQ3hELFFBQVEsUUFBUSxXQUFXLHFCQUFxQjtBQUFBLFFBQ2hELE9BQU8sUUFBUSxXQUFXLG9CQUFvQjtBQUFBLFFBQzlDLFFBQVEsUUFBUSxXQUFXLHFCQUFxQjtBQUFBLE1BQ2xEO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFFBQVEsY0FBYyxHQUFHLFNBQVMsSUFBSSxXQUFXLE9BQU8sUUFBUSxLQUFLO0FBQUEsSUFDbEY7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBRUE7QUFBQTtBQUFBLFFBRUE7QUFBQTtBQUFBLFFBRUE7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBO0FBQUEsUUFFQTtBQUFBO0FBQUEsUUFFQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0EsaUJBQWlCO0FBQUEsUUFDakIscUJBQXFCO0FBQUEsTUFDdkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsRUFDZjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
