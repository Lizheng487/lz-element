import { it, describe, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Popconfirm from "./Popconfirm.vue";
import type { PopconfirmProps } from "./type";
import { each, get } from "lodash-es";

describe("Popconfirm.vue", () => {
  const props = {
    title: "确定要删除吗？",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    confirmButtonType: "primary",
    cancelButtonType: "info",
    icon: "check-circle",
    iconColor: "red",
    hideIcon: false,
    hideAfter: 500,
    width: 200,
  } as PopconfirmProps;
  it("shuold accept all props", () => {
    const wrapper = mount(Popconfirm, {
      props,
    });
    each(props, (value, key) => {
      expect(get(wrapper.props(), key)).toBe(value);
    });
  });
  it("should render slot content correctly", () => {
    const slotContent = "确定要删除吗？";
    const wrapper = mount(Popconfirm, {
      props,
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.text()).toContain(slotContent);
  });
});
