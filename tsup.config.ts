import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: {
    entry: "./src/index.ts",
    resolve: true,
  },
  target: "esnext",
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "next",
    "tailwindcss",
    "fabric",
    "@fortawesome/*",
    "@radix-ui/*",
  ],
  esbuildOptions(options) {
    options.jsx = "transform";
  },
});
