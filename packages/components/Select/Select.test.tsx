import { rAF } from "@lz-element/utils";
import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Select from "./Select.vue";
import Option from "./Option.vue";
import type { SelectOptionProps } from "./types"; 
import { SELECT_CTX_KEY } from "./constants";
describe("Select", () => {
  test("select renders with default props", async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: "1",
        options: [
          {
            value: "1",
            label: "1",
          },
          {
            value: "2",
            label: "2",
          },
        ],
      },
    });
    wrapper.find("input").trigger("click");
    await rAF();
    expect(wrapper.text()).toContain("1");
  });
  test("select an option", async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: "",
        options: [
          {
            value: "1",
            label: "1",
          },
          {
            value: "2",
            label: "2",
          },
        ],
      },
    });
    wrapper.find("input").trigger("click");
    await rAF();
    const option = wrapper.findAll("li").at(0);
    await option?.trigger("click");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["1"]);
  });
  test("option emits an event on click", async () => {
    const ctx = {
      handleSelect: vi.fn(),
      selectStates: {
        selectedOption: null,
      },
      renderLabel: (props: SelectOptionProps) => `label:${props.label}`,
    };
    const wrapper = mount(Option, {
      props: {
        value: "1",
        label: "1",
      },
      global: {
        provide: {
          [SELECT_CTX_KEY as any]: ctx,
        },
      },
    });
    await wrapper.trigger("click");
    expect(ctx.handleSelect).toHaveBeenCalled()
  });
});
