import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // Custom plugin to load markdown files
        {
            name: "markdown-loader",
            transform(code, id) {
                if (id.slice(-3) === ".md") {
                    // For .md files, get the raw content
                    return `export default ${JSON.stringify(code)};`;
                }
            },
        },
        tailwindcss(),
    ],
    base: "/",
});
