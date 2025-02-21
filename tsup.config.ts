import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  target: "es2018",
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  treeshake: true,
  sourcemap: true,
  minify: true,
});
