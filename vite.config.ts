import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { compression } from "vite-plugin-compression2";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig(({ command }) => ({
	server: {
		open: true,
		host: true,
	},
	ssr: {
		noExternal: command === "build" ? true : undefined,
	},
	plugins: [
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
		compression({
			algorithms: ["brotliCompress", "gzip"],
		}),
		ViteImageOptimizer(),
		devtoolsJson(),
	],
}));
