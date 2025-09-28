import Message from "./methods";
import { withInstallFunction } from "@lz-element/utils";

export const LzMessage = withInstallFunction(Message, "$Message");
export * from "./types";
