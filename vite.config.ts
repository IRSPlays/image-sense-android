
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
      plugins: [
        {
          // TypeScript expects this to be a plugin configuration that has a specific type
          // Using a properly typed configuration object
          name: "inject-gpt-engineer-script" as const,
          transformIndexHtml(html: string) {
            return html.replace(
              /<head>([\s\S]*?)<\/head>/,
              `<head>$1<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script></head>`
            );
          },
        },
      ],
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
