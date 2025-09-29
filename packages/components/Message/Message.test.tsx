import { describe, test, expect } from "vitest";
import { nextTick } from "vue";
import { message, closeAll } from "./methods";

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};
function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element);
  const topValue = styles.getPropertyValue("top");
  return Number.parseFloat(topValue);
}

describe("Message", () => {
  test("message", async () => {
    const handler = message({ message: "hello", duration: 0 });
    await rAF();
    expect(document.querySelector(".lz-message")).toBeTruthy();
    handler.close();
    await rAF();
    expect(document.querySelector(".lz-message")).toBeFalsy();
  });
  test("call message() function more than once", async () => {
    message({ message: "hello 1", duration: 0 });
    message({ message: "hello 2", duration: 0 });
    message({ message: "hello 3", duration: 0 });
    await rAF();
    expect(document.querySelectorAll(".lz-message").length).toBe(3);
    closeAll();
    await rAF();
    expect(document.querySelector(".lz-message")).toBeFalsy();
  });
  test("message offset", async () => {
    message({ message: "hello", duration: 0, offset: 100 });
    message({ message: "hello", duration: 0, offset: 50 });
    await rAF();
    const elements = document.querySelectorAll(".lz-message");
    expect(elements.length).toBe(2);
    expect(getTopValue(elements[0])).toBe(100);
    expect(getTopValue(elements[1])).toBe(150);
  });
});
