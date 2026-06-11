import { defineConfig } from "@storylite/storylite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  stories: ["./**/*.stories.ts"],
  css: ["../web/button/button.css"],
  vitePlugins: [tailwindcss()],
})
