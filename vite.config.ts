import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from "path";

// Vitest configuration
import { defineConfig as defineVitestConfig } from "vitest/config";

export default defineVitestConfig({
	plugins: [
		react(),
		viteCommonjs(),
		visualizer({ open: true, gzipSize: true, brotliSize: true }),
	],
	test: {
		// Test configuration options here
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"], // If you have setup files
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
