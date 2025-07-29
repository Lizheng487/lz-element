import { makeInstaller } from "@lz-element/utils";
import components from "./components";
import '@lz-element/theme/index.css'

const installer = makeInstaller(components);

export * from "@lz-element/components";
export default installer;
