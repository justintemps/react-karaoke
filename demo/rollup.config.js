import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import path from "path";

export default {
  input: "demo/src/app.tsx",
  output: {
    file: "demo/dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js"],
    }),
    postcss({
      modules: true,
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "demo"],
      host: "localhost",
      port: 3000,
    }),
    livereload({
      watch: [path.resolve(__dirname, "dist"), path.resolve(__dirname, "src")],
    }),
  ],
};
