// build/vite.umd.config.ts
import { defineConfig } from "file:///E:/work/lz-element/node_modules/.pnpm/vite@5.4.19_@types+node@20.19.9_sass@1.90.0_terser@5.43.1/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/work/lz-element/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vi_88b284c7b5274fc46c36610e890908ad/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import { compression } from "file:///E:/work/lz-element/node_modules/.pnpm/vite-plugin-compression2@2.2.0_rollup@4.46.2/node_modules/vite-plugin-compression2/dist/index.mjs";
import { readFile } from "fs";
import shell from "file:///E:/work/lz-element/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
import { delay, defer } from "file:///E:/work/lz-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import terser from "file:///E:/work/lz-element/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.46.2/node_modules/@rollup/plugin-terser/dist/es/index.js";
import { visualizer } from "file:///E:/work/lz-element/node_modules/.pnpm/rollup-plugin-visualizer@6.0.3_rollup@4.46.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { hooksPlugin as hooks } from "file:///E:/work/lz-element/libs/vite-plugins/.dist/index.mjs";
var __vite_injected_original_dirname = "E:\\work\\lz-element\\packages\\core\\build";
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
var TRY_MOVE_STYLE_DELAY = 1e3;
function moveStyles() {
  readFile("./dist/umd/index.css.gz", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLE_DELAY);
    defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
  });
}
var vite_umd_config_default = defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: "dist/stats.umd.html"
    }),
    compression({ include: /.(cjs|css)$/i }),
    hooks({
      rmFiles: ["./dist/umd", "./dist/index.css"],
      afterBuild: moveStyles
    }),
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      }
    })
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "../index.ts"),
      name: "LzElement",
      fileName: "index",
      formats: ["umd"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue"
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name;
        }
      }
    }
  }
});
export {
  vite_umd_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvdml0ZS51bWQuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcd29ya1xcXFxsei1lbGVtZW50XFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHdvcmtcXFxcbHotZWxlbWVudFxcXFxwYWNrYWdlc1xcXFxjb3JlXFxcXGJ1aWxkXFxcXHZpdGUudW1kLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovd29yay9sei1lbGVtZW50L3BhY2thZ2VzL2NvcmUvYnVpbGQvdml0ZS51bWQuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wcmVzc2lvbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvbjJcIjtcbmltcG9ydCB7IHJlYWRGaWxlIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgc2hlbGwgZnJvbSBcInNoZWxsanNcIjtcbmltcG9ydCB7IGRlbGF5LCBkZWZlciB9IGZyb20gXCJsb2Rhc2gtZXNcIjtcbi8vIGltcG9ydCBob29rcyBmcm9tIFwiLi4vaG9va1BsdWdpblwiO1xuaW1wb3J0IHRlcnNlciBmcm9tIFwiQHJvbGx1cC9wbHVnaW4tdGVyc2VyXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuaW1wb3J0IHsgaG9va3NQbHVnaW4gYXMgaG9va3N9IGZyb20gXCJAbHotZWxlbWVudC92aXRlLXBsdWdpbnNcIjtcblxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiO1xuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiO1xuY29uc3QgaXNUZXN0ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwidGVzdFwiO1xuY29uc3QgVFJZX01PVkVfU1RZTEVfREVMQVkgPSAxMDAwIGFzIGNvbnN0O1xuZnVuY3Rpb24gbW92ZVN0eWxlcygpIHtcbiAgcmVhZEZpbGUoXCIuL2Rpc3QvdW1kL2luZGV4LmNzcy5nelwiLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGRlbGF5KG1vdmVTdHlsZXMsIFRSWV9NT1ZFX1NUWUxFX0RFTEFZKTtcbiAgICBkZWZlcigoKSA9PiBzaGVsbC5jcChcIi4vZGlzdC91bWQvaW5kZXguY3NzXCIsIFwiLi9kaXN0L2luZGV4LmNzc1wiKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdmlzdWFsaXplcih7XG4gICAgICBmaWxlbmFtZTogXCJkaXN0L3N0YXRzLnVtZC5odG1sXCIsXG4gICAgfSksXG4gICAgY29tcHJlc3Npb24oeyBpbmNsdWRlOiAvLihjanN8Y3NzKSQvaSB9KSxcbiAgICBob29rcyh7XG4gICAgICBybUZpbGVzOiBbXCIuL2Rpc3QvdW1kXCIsIFwiLi9kaXN0L2luZGV4LmNzc1wiXSxcbiAgICAgIGFmdGVyQnVpbGQ6IG1vdmVTdHlsZXMsXG4gICAgfSksXG4gICAgdGVyc2VyKHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogW1wibG9nXCJdLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgICBwYXNzZXM6IDMsXG4gICAgICAgIGdsb2JhbF9kZWZzOiB7XG4gICAgICAgICAgXCJAREVWXCI6IEpTT04uc3RyaW5naWZ5KGlzRGV2KSxcbiAgICAgICAgICBcIkBQUk9EXCI6IEpTT04uc3RyaW5naWZ5KGlzUHJvZCksXG4gICAgICAgICAgXCJAVEVTVFwiOiBKU09OLnN0cmluZ2lmeShpc1Rlc3QpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiZGlzdC91bWRcIixcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9pbmRleC50c1wiKSxcbiAgICAgIG5hbWU6IFwiTHpFbGVtZW50XCIsXG4gICAgICBmaWxlTmFtZTogXCJpbmRleFwiLFxuICAgICAgZm9ybWF0czogW1widW1kXCJdLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcInZ1ZVwiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBleHBvcnRzOiBcIm5hbWVkXCIsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6IFwiVnVlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09PSBcInN0eWxlLmNzc1wiKSByZXR1cm4gXCJpbmRleC5jc3NcIjtcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWUgYXMgc3RyaW5nO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdULFNBQVMsb0JBQW9CO0FBQ3JWLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyxnQkFBZ0I7QUFDekIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsT0FBTyxhQUFhO0FBRTdCLE9BQU8sWUFBWTtBQUNuQixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLGVBQWUsYUFBWTtBQVZwQyxJQUFNLG1DQUFtQztBQVl6QyxJQUFNLFNBQVMsUUFBUSxJQUFJLGFBQWE7QUFDeEMsSUFBTSxRQUFRLFFBQVEsSUFBSSxhQUFhO0FBQ3ZDLElBQU0sU0FBUyxRQUFRLElBQUksYUFBYTtBQUN4QyxJQUFNLHVCQUF1QjtBQUM3QixTQUFTLGFBQWE7QUFDcEIsV0FBUywyQkFBMkIsQ0FBQyxRQUFRO0FBQzNDLFFBQUksSUFBSyxRQUFPLE1BQU0sWUFBWSxvQkFBb0I7QUFDdEQsVUFBTSxNQUFNLE1BQU0sR0FBRyx3QkFBd0Isa0JBQWtCLENBQUM7QUFBQSxFQUNsRSxDQUFDO0FBQ0g7QUFFQSxJQUFPLDBCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDVCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxZQUFZLEVBQUUsU0FBUyxlQUFlLENBQUM7QUFBQSxJQUN2QyxNQUFNO0FBQUEsTUFDSixTQUFTLENBQUMsY0FBYyxrQkFBa0I7QUFBQSxNQUMxQyxZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDUixjQUFjLENBQUMsS0FBSztBQUFBLFFBQ3BCLGVBQWU7QUFBQSxRQUNmLFFBQVE7QUFBQSxRQUNSLGFBQWE7QUFBQSxVQUNYLFFBQVEsS0FBSyxVQUFVLEtBQUs7QUFBQSxVQUM1QixTQUFTLEtBQUssVUFBVSxNQUFNO0FBQUEsVUFDOUIsU0FBUyxLQUFLLFVBQVUsTUFBTTtBQUFBLFFBQ2hDO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDdkMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLFFBQ0EsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixjQUFJLFVBQVUsU0FBUyxZQUFhLFFBQU87QUFDM0MsaUJBQU8sVUFBVTtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
