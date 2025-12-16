import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { compression } from "vite-plugin-compression2";
import { readFile } from "fs";
import shell from "shelljs";
import { delay, defer } from "lodash-es";
// import hooks from "../hookPlugin";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import { hooksPlugin as hooks} from "@lz-element/vite-plugins";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
const TRY_MOVE_STYLE_DELAY = 1000 as const;
function moveStyles() {
  readFile("./dist/umd/index.css.gz", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLE_DELAY);
    defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
  });
}

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: "dist/stats.umd.html",
    }),
    compression({ include: /.(cjs|css)$/i }),
    hooks({
      rmFiles: ["./dist/umd", "./dist/index.css"],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "../index.ts"),
      name: "LzElement",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});
