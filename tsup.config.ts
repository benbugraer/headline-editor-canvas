import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "next"],
  target: "es2018",
  platform: "browser",
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
    options.define = {
      "process.env.NODE_ENV": '"production"',
    };
  },
  treeshake: true,
  sourcemap: true,
  minify: true,
  splitting: false,
  keepNames: true,
});
