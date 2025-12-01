import { describe, test, expect } from "vitest";
import { notification } from "./methods";
import { rAF } from "@lz-element/utils";

function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element);
  const topValue = styles.getPropertyValue("top");
  return Number.parseFloat(topValue);
}

describe("Notification", () => {
  test("notification", async () => {
    const handler = notification({ message: "hello", duration: 0 });
    await rAF();
    expect(document.querySelector(".lz-notification")).toBeTruthy();
    handler.close();
    await rAF();
    expect(document.querySelector(".lz-notification")).toBeFalsy();
  });
  test("call notification() function more than once", async () => {
    notification({ message: "hello 1", duration: 0 });
    notification({ message: "hello 2", duration: 0 });
    notification({ message: "hello 3", duration: 0 });
    await rAF();
    expect(document.querySelectorAll(".lz-notification").length).toBe(3);
    notification.closeAll();
    await rAF();
    expect(document.querySelector(".lz-notification")).toBeFalsy();
  });
  test("notification offset", async () => {
    notification({ message: "hello", duration: 0, offset: 100 });
    notification({ message: "hello", duration: 0, offset: 50 });
    await rAF();
    const elements = document.querySelectorAll(".lz-notification");
    expect(elements.length).toBe(2);
    expect(getTopValue(elements[0])).toBe(100);
    expect(getTopValue(elements[1])).toBe(150);
  });
});
