```tsx
// Collapse.test.tsx
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Collapse from "@/components/Collapse.vue  ";
import CollapseItem from "@/components/CollapseItem.vue";

describe("LzElement Collapse Component", () => {
  /* ---------- 4.1 基础能力 ---------- */
  it("renders empty when no panels provided", () => {
    const wrapper = mount(() => <Collapse />);
    expect(wrapper.findAllComponents(CollapseItem)).toHaveLength(0);
  });

  it("expands specified panels via v-model", async () => {
    const wrapper = mount(() => (
      <Collapse modelValue={["a"]}>
        <CollapseItem name="a" title="A" />
        <CollapseItem name="b" title="B" />
      </Collapse>
    ));
    expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(true);
  });

  it("works in accordion mode expanding only one item", async () => {
    const wrapper = mount(() => (
      <Collapse accordion modelValue={["a"]}>
        <CollapseItem name="a" title="A" />
        <CollapseItem name="b" title="B" />
      </Collapse>
    ));
    await wrapper.findAll(".lz-collapse-header")[1].trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["b"]);
  });

  it("prevents interaction when collapsible is false", () => {
    const wrapper = mount(() => (
      <Collapse collapsible={false} modelValue={["a"]}>
        <CollapseItem name="a" title="A" />
      </Collapse>
    ));
    expect(wrapper.find(".lz-collapse-header").classes()).toContain(
      "lz-collapse-header--disabled"
    );
  });

  /* ---------- 4.2 动画 ---------- */
  it("applies custom transition duration via CSS variable", () => {
    const wrapper = mount(() => <Collapse />);
    const panel = wrapper.element;
    expect(
      getComputedStyle(panel).getPropertyValue("--lz-collapse-duration")
    ).toBe("300ms");
  });

  it("disables animation when animated is false", async () => {
    const wrapper = mount(() => (
      <Collapse animated={false} modelValue={["a"]}>
        <CollapseItem name="a" title="A" />
      </Collapse>
    ));
    const content = wrapper.find(".lz-collapse-content");
    expect(content.classes()).toContain("lz-collapse-content--no-animate");
  });

  /* ---------- 4.3 手势与键盘 ---------- */
  it("toggles panel on keyboard Enter", async () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem name="a" title="A" />
      </Collapse>
    ));
    const header = wrapper.find(".lz-collapse-header");
    await header.trigger("keydown", { code: "Enter" });
    expect(wrapper.emitted("change")?.[0]).toEqual([["a"]]);
  });

  it("toggles panel on keyboard Space", async () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem name="a" title="A" />
      </Collapse>
    ));
    const header = wrapper.find(".lz-collapse-header");
    await header.trigger("keydown", { code: "Space" });
    expect(wrapper.emitted("change")?.[0]).toEqual([["a"]]);
  });

  it("moves focus up/down with arrow keys", async () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem name="a" title="A" />
        <CollapseItem name="b" title="B" />
      </Collapse>
    ));
    const [h1, h2] = wrapper.findAll(".lz-collapse-header");
    h1.element.focus();
    await h1.trigger("keydown", { code: "ArrowDown" });
    expect(document.activeElement).toBe(h2.element);
    await h2.trigger("keydown", { code: "ArrowUp" });
    expect(document.activeElement).toBe(h1.element);
  });

  /* ---------- 4.4 主题 Token ---------- */
  it("uses CSS variables for header background", () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem name="a" title="A" />
      </Collapse>
    ));
    const header = wrapper.find(".lz-collapse-header").element;
    expect(
      getComputedStyle(header).getPropertyValue("--lz-collapse-header-bg")
    ).toBe("#ffffff");
  });

  /* ---------- 4.5 面板项属性 ---------- */
  it("displays custom title as VNode", () => {
    const Title = () => <span class="custom-title">Hello</span>;
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem name="a" v-slots={{ title: () => <Title /> }} />
      </Collapse>
    ));
    expect(wrapper.find(".custom-title").exists()).toBe(true);
  });

  it("shows disabled state", () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem name="a" title="A" disabled />
      </Collapse>
    ));
    expect(wrapper.find(".lz-collapse-item--disabled").exists()).toBe(true);
  });

  it("renders custom icon", () => {
    const Icon = () => <svg data-test="icon" />;
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem name="a" title="A" icon={<Icon />} />
      </Collapse>
    ));
    expect(wrapper.findComponent(Icon).exists()).toBe(true);
  });

  it("renders extra content", () => {
    const Extra = () => <button>Action</button>;
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem name="a" title="A" v-slots={{ extra: () => <Extra /> }} />
      </Collapse>
    ));
    expect(wrapper.find("button").text()).toBe("Action");
  });

  /* ---------- 4.6 事件 ---------- */
  it("emits expand event when panel opens", async () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem name="a" title="A" />
      </Collapse>
    ));
    await wrapper.find(".lz-collapse-header").trigger("click");
    expect(wrapper.emitted("expand")?.[0]).toEqual(["a"]);
  });

  it("emits collapse event when panel closes", async () => {
    const wrapper = mount(() => (
      <Collapse modelValue={["a"]}>
        <CollapseItem name="a" title="A" />
      </Collapse>
    ));
    await wrapper.find(".lz-collapse-header").trigger("click");
    expect(wrapper.emitted("collapse")?.[0]).toEqual(["a"]);
  });

  /* ---------- 嵌套层级 ---------- */
  it("renders 5-level nested panels without error", () => {
    const createNested = (level: number): JSX.Element => (
      <CollapseItem name={`level-${level}`} title={`Level ${level}`}>
        {level < 5 ? (
          <Collapse nestable={false}>{createNested(level + 1)}</Collapse>
        ) : null}
      </CollapseItem>
    );

    expect(() =>
      mount(() => <Collapse nestable>{createNested(1)}</Collapse>)
    ).not.toThrow();
  });

  /* ---------- 无障碍属性 ---------- */
  it("sets aria-expanded & aria-controls correctly", () => {
    const wrapper = mount(() => (
      <Collapse modelValue={["a"]}>
        <CollapseItem name="a" title="A" />
      </Collapse>
    ));
    const header = wrapper.find(".lz-collapse-header");
    const content = wrapper.find(".lz-collapse-content");
    expect(header.attributes("aria-expanded")).toBe("true");
    expect(header.attributes("aria-controls")).toBe(content.attributes("id"));
  });
});
```
