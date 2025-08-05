import { makeInstaller } from "@lz-element/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import "@lz-element/theme/index.css";
import printLogo from "./printLogo";


printLogo();
library.add(fas);
const installer = makeInstaller(components);

export * from "@lz-element/components";
export default installer;
