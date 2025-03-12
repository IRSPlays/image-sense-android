
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
      jsxImportSource: undefined, // Remove emotion configuration
      plugins: [], // Provide empty plugins array instead of babel config
    }),
    {
      name: 'inject-gpt-engineer-script',
      transformIndexHtml(html: string) {
        return html.replace(
          /<head>([\s\S]*?)<\/head>/,
          `<head>$1<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script></head>`
        );
      },
    },
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
