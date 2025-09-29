import Notification from "./methods";
import { withInstallFunction } from "@lz-element/utils";

export const LzNotification = withInstallFunction(Notification, "LzNotification");
export * from './types'