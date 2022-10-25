import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import bundleSize from "rollup-plugin-bundle-size";
import { visualizer } from "rollup-plugin-visualizer";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    name: "Heex",
    format: "esm",
    sourcemap: true,
    globals: {
      react: "React",
    },
  },
  external: ["react", /@babel\/runtime/],
  plugins: [
    json(),
    replace({
      values: {
        "process.env.NODE_ENV": '"production"',
      },
      preventAssignment: true,
    }),
    scss({
      outputStyle: "compressed",
    }),
    resolve({
      extensions: [".js", ".jsx"],
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      babelHelpers: "runtime",
      exclude: /node_modules/,
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: ["@babel/plugin-transform-runtime"],
    }),
    bundleSize(),
    visualizer(),
  ],
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    warn(warning);
  },
};
