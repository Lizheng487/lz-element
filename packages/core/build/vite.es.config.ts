import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { readdirSync, readdir } from "fs";
import { filter, map, delay, defer } from "lodash-es";
import shell from "shelljs";
// import hooks from "../hookPlugin";
import { hooksPlugin as hooks} from "@lz-element/vite-plugins";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
const TRY_MOVE_STYLE_DELAY = 1000 as const;

// getDirectoriesSync方法 获取当前目录下的所有子目录
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLE_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
  // try {
  //   readdirSync("./dist/es/theme");
  //   shell.mv("./dist/es/theme", "./dist");
  // } catch (_) {
  //   delay(moveStyles, TRY_MOVE_STYLE_DELAY);
  // }
}

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: "dist/stats.es.html",
    }),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    hooks({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 2 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "../index.ts"),
      name: "LzElement",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/free-solid-svg-icons",
        "@@fortawesome/fontawesome-svg-core",
        "@fortawesome/vue-fontawesome",
        "@poperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (
            id.includes("/packages/utils") ||
            id.includes("plugin-vue:export-helper")
          ) {
            return "utils";
          }
          for (const item of getDirectoriesSync("../components")) {
            if (id.includes("/packages/components/" + item + "/")) {
              return item;
            }
          }
        },
      },
    },
  },
});
