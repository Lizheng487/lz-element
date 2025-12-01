import { rAF } from "@lz-element/utils";
import { describe, it, expect } from "vitest";
import { Loading } from "./service";

describe("Loading", () => {
  it("loading", async () => {
    const instance = Loading();
    expect(instance).toBeTruthy();
  });
  it("loading mask", async () => {
    Loading();
    await rAF();
    expect(document.querySelector(".lz-loading__mask")).toBeTruthy();
  });
  it("loading close", async () => {
    const instance = Loading();
    await rAF();
    expect(document.querySelector(".lz-loading")).toBeTruthy();
    instance.close();
    await rAF();
    expect(document.querySelector(".lz-loading")).toBeFalsy();
  });
});
