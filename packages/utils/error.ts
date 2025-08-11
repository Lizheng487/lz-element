import { isString } from "lodash-es";

class LzUIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LzUIError";
  }
}
function createLzUIError(scope: string, msg: string) {
  return new LzUIError(`[${scope}]:${msg}`);
}
export function throwError(scope: string, msg: string) {
  throw createLzUIError(scope, msg);
}
export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string): void {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? new LzUIError(`[${scope}] ${msg}`) : scope;
    console.warn(err);
  }
}
