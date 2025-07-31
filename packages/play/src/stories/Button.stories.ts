import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3-vite";

import { fn,within,userEvent,expect } from "storybook/test";

import { LzButton } from "lz-element";

type Story = StoryObj<typeof LzButton> & { args: ArgTypes };

const meta: Meta<typeof LzButton> = {
  title: "LzButton",
  component: LzButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "sussess", "warning", "info", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["large", "small", "default"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    useThrottle: {
      control: { type: "boolean" },
    },
    throttleDuration: {
      control: { type: "number" },
    },
    autofocus: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  args: {
    onClick: fn(),
  },
};
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
const container = (val: string) => `
<div style="display: flex;">
${val}
</div>`;
export const Default: Story & {
  args: {
    content: string;
  };
} = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "Button",
  },
  render: (args: any) => ({
    components: { LzButton },
    setup() {
      return { args };
    },
    template: container(
      `<lz-button v-bind="args">{{args.content}}</lz-button>`
    ),
  }),
  // play: async ({ canvasElement,args,step }) => { 
  //   const canvas = within(canvasElement);
  //   await step('click btn ',async () => {
  //     await userEvent.click(canvas.getByRole("button"));
  //   });
  //   expect(args.onClick).toHaveBeenCalled()
  // },
};
export default meta;
