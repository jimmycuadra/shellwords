import { defineConfig } from "rollup";
import ts from "rollup-plugin-ts";
import pkg from "./package.json";

const input = "src/shellwords.ts";

const config = defineConfig([
  {
    input,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [ts()],
  },
  {
    input,
    output: {
      name: "shellwords",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
    },
    plugins: [ts()],
  },
]);

export default config;
