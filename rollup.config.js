import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    name: "Heex",
    format: "umd",
    sourcemap: true,
    exports: "auto",
    globals: {
      react: "React",
    },
  },
  external: ["react"],
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
  ],
};