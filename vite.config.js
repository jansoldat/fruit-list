import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { defineConfig } from "vitest/config";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: normalizePath(path.resolve("./src/assets/locales")),
                    dest: normalizePath(path.resolve("./dist")),
                },
            ],
        }),
    ],
    server: {
        host: true,
        strictPort: false,
        proxy: {
            "/api": {
                target: "https://www.fruityvice.com",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, "/api/"),
            },
        },
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        css: true,
    },
});
