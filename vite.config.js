import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@style": path.resolve(__dirname, "./src/style/index.css"),
			"@ui": path.resolve(__dirname, "./src/shared/ui"),
			"@hooks": path.resolve(__dirname, "./src/shared/hooks"),
		},
	},
	plugins: [react(), tailwindcss()],
});
