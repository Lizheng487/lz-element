// build/vite.es.config.ts
import { defineConfig } from "file:///E:/work/lz-element/node_modules/.pnpm/vite@5.4.19_@types+node@20.19.9_sass@1.90.0_terser@5.43.1/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/work/lz-element/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vi_88b284c7b5274fc46c36610e890908ad/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import dts from "file:///E:/work/lz-element/node_modules/.pnpm/vite-plugin-dts@3.9.1_@type_1db37eca6c97fa5861f27b96e0d48efc/node_modules/vite-plugin-dts/dist/index.mjs";
import { readdirSync, readdir } from "fs";
import { filter, map, delay, defer } from "file:///E:/work/lz-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell from "file:///E:/work/lz-element/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
import { hooksPlugin as hooks } from "file:///E:/work/lz-element/libs/vite-plugins/.dist/index.mjs";
import terser from "file:///E:/work/lz-element/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.46.2/node_modules/@rollup/plugin-terser/dist/es/index.js";
import { visualizer } from "file:///E:/work/lz-element/node_modules/.pnpm/rollup-plugin-visualizer@6.0.3_rollup@4.46.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "E:\\work\\lz-element\\packages\\core\\build";
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
var TRY_MOVE_STYLE_DELAY = 1e3;
function getDirectoriesSync(basePath) {
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
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: "dist/stats.es.html"
    }),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    }),
    hooks({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles
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
          "@TEST": JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev
      }
    })
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "../index.ts"),
      name: "LzElement",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/free-solid-svg-icons",
        "@@fortawesome/fontawesome-svg-core",
        "@fortawesome/vue-fontawesome",
        "@poperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (assetInfo.type === "asset" && /\.(css)$/i.test(assetInfo.name)) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name;
        },
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
            return "utils";
          }
          for (const item of getDirectoriesSync("../components")) {
            if (id.includes("/packages/components/" + item + "/")) {
              return item;
            }
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvdml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx3b3JrXFxcXGx6LWVsZW1lbnRcXFxccGFja2FnZXNcXFxcY29yZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcd29ya1xcXFxsei1lbGVtZW50XFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcYnVpbGRcXFxcdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3dvcmsvbHotZWxlbWVudC9wYWNrYWdlcy9jb3JlL2J1aWxkL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCB7IHJlYWRkaXJTeW5jLCByZWFkZGlyIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgZGVsYXksIGRlZmVyIH0gZnJvbSBcImxvZGFzaC1lc1wiO1xuaW1wb3J0IHNoZWxsIGZyb20gXCJzaGVsbGpzXCI7XG4vLyBpbXBvcnQgaG9va3MgZnJvbSBcIi4uL2hvb2tQbHVnaW5cIjtcbmltcG9ydCB7IGhvb2tzUGx1Z2luIGFzIGhvb2tzfSBmcm9tIFwiQGx6LWVsZW1lbnQvdml0ZS1wbHVnaW5zXCI7XG5pbXBvcnQgdGVyc2VyIGZyb20gXCJAcm9sbHVwL3BsdWdpbi10ZXJzZXJcIjtcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5cbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIjtcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcbmNvbnN0IGlzVGVzdCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInRlc3RcIjtcbmNvbnN0IFRSWV9NT1ZFX1NUWUxFX0RFTEFZID0gMTAwMCBhcyBjb25zdDtcblxuLy8gZ2V0RGlyZWN0b3JpZXNTeW5jXHU2NUI5XHU2Q0Q1IFx1ODNCN1x1NTNENlx1NUY1M1x1NTI0RFx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NFx1NjI0MFx1NjcwOVx1NUI1MFx1NzZFRVx1NUY1NVxuZnVuY3Rpb24gZ2V0RGlyZWN0b3JpZXNTeW5jKGJhc2VQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgZW50cmllcyA9IHJlYWRkaXJTeW5jKGJhc2VQYXRoLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XG4gIHJldHVybiBtYXAoXG4gICAgZmlsdGVyKGVudHJpZXMsIChlbnRyeSkgPT4gZW50cnkuaXNEaXJlY3RvcnkoKSksXG4gICAgKGVudHJ5KSA9PiBlbnRyeS5uYW1lXG4gICk7XG59XG5mdW5jdGlvbiBtb3ZlU3R5bGVzKCkge1xuICByZWFkZGlyKFwiLi9kaXN0L2VzL3RoZW1lXCIsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gZGVsYXkobW92ZVN0eWxlcywgVFJZX01PVkVfU1RZTEVfREVMQVkpO1xuICAgIGRlZmVyKCgpID0+IHNoZWxsLm12KFwiLi9kaXN0L2VzL3RoZW1lXCIsIFwiLi9kaXN0XCIpKTtcbiAgfSk7XG4gIC8vIHRyeSB7XG4gIC8vICAgcmVhZGRpclN5bmMoXCIuL2Rpc3QvZXMvdGhlbWVcIik7XG4gIC8vICAgc2hlbGwubXYoXCIuL2Rpc3QvZXMvdGhlbWVcIiwgXCIuL2Rpc3RcIik7XG4gIC8vIH0gY2F0Y2ggKF8pIHtcbiAgLy8gICBkZWxheShtb3ZlU3R5bGVzLCBUUllfTU9WRV9TVFlMRV9ERUxBWSk7XG4gIC8vIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgZmlsZW5hbWU6IFwiZGlzdC9zdGF0cy5lcy5odG1sXCIsXG4gICAgfSksXG4gICAgZHRzKHtcbiAgICAgIHRzY29uZmlnUGF0aDogXCIuLi8uLi90c2NvbmZpZy5idWlsZC5qc29uXCIsXG4gICAgICBvdXREaXI6IFwiZGlzdC90eXBlc1wiLFxuICAgIH0pLFxuICAgIGhvb2tzKHtcbiAgICAgIHJtRmlsZXM6IFtcIi4vZGlzdC9lc1wiLCBcIi4vZGlzdC90aGVtZVwiLCBcIi4vZGlzdC90eXBlc1wiXSxcbiAgICAgIGFmdGVyQnVpbGQ6IG1vdmVTdHlsZXMsXG4gICAgfSksXG4gICAgdGVyc2VyKHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIHNlcXVlbmNlczogaXNQcm9kLFxuICAgICAgICBhcmd1bWVudHM6IGlzUHJvZCxcbiAgICAgICAgZHJvcF9jb25zb2xlOiBpc1Byb2QgJiYgW1wibG9nXCJdLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiBpc1Byb2QsXG4gICAgICAgIHBhc3NlczogaXNQcm9kID8gMiA6IDEsXG4gICAgICAgIGdsb2JhbF9kZWZzOiB7XG4gICAgICAgICAgXCJAREVWXCI6IEpTT04uc3RyaW5naWZ5KGlzRGV2KSxcbiAgICAgICAgICBcIkBQUk9EXCI6IEpTT04uc3RyaW5naWZ5KGlzUHJvZCksXG4gICAgICAgICAgXCJAVEVTVFwiOiBKU09OLnN0cmluZ2lmeShpc1Rlc3QpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGZvcm1hdDoge1xuICAgICAgICBzZW1pY29sb25zOiBmYWxzZSxcbiAgICAgICAgc2hvcnRoYW5kOiBpc1Byb2QsXG4gICAgICAgIGJyYWNlczogIWlzUHJvZCxcbiAgICAgICAgYmVhdXRpZnk6ICFpc1Byb2QsXG4gICAgICAgIGNvbW1lbnRzOiAhaXNQcm9kLFxuICAgICAgfSxcbiAgICAgIG1hbmdsZToge1xuICAgICAgICB0b3BsZXZlbDogaXNQcm9kLFxuICAgICAgICBldmFsOiBpc1Byb2QsXG4gICAgICAgIGtlZXBfY2xhc3NuYW1lczogaXNEZXYsXG4gICAgICAgIGtlZXBfZm5hbWVzOiBpc0RldixcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImRpc3QvZXNcIixcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9pbmRleC50c1wiKSxcbiAgICAgIG5hbWU6IFwiTHpFbGVtZW50XCIsXG4gICAgICBmaWxlTmFtZTogXCJpbmRleFwiLFxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcInZ1ZVwiLFxuICAgICAgICBcIkBmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29uc1wiLFxuICAgICAgICBcIkBAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIixcbiAgICAgICAgXCJAZm9ydGF3ZXNvbWUvdnVlLWZvbnRhd2Vzb21lXCIsXG4gICAgICAgIFwiQHBvcGVyanMvY29yZVwiLFxuICAgICAgICBcImFzeW5jLXZhbGlkYXRvclwiLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZSA9PT0gXCJzdHlsZS5jc3NcIikgcmV0dXJuIFwiaW5kZXguY3NzXCI7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYXNzZXRJbmZvLnR5cGUgPT09IFwiYXNzZXRcIiAmJlxuICAgICAgICAgICAgL1xcLihjc3MpJC9pLnRlc3QoYXNzZXRJbmZvLm5hbWUgYXMgc3RyaW5nKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIFwidGhlbWUvW25hbWVdLltleHRdXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZSBhcyBzdHJpbmc7XG4gICAgICAgIH0sXG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3JcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL3BhY2thZ2VzL2hvb2tzXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJob29rc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBpZC5pbmNsdWRlcyhcIi9wYWNrYWdlcy91dGlsc1wiKSB8fFxuICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJwbHVnaW4tdnVlOmV4cG9ydC1oZWxwZXJcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBcInV0aWxzXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBnZXREaXJlY3Rvcmllc1N5bmMoXCIuLi9jb21wb25lbnRzXCIpKSB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvcGFja2FnZXMvY29tcG9uZW50cy9cIiArIGl0ZW0gKyBcIi9cIikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNULFNBQVMsb0JBQW9CO0FBQ25WLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFD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
