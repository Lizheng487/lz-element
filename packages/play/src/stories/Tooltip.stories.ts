import type { StoryObj, Meta } from "@storybook/vue3-vite";

import { fn } from "storybook/test";
import { LzButton, LzTooltip } from "lz-element";
import 'lz-element/dist/theme/Tooltip.css'

type Story = StoryObj<typeof LzTooltip>;

const meta: Meta<typeof LzTooltip> = {
  title: "Example/Tooltip",
  component: LzTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: {
        type: "select",
      },
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    "onVisible-change": fn(),
  },
};

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    placement: "top",
    trigger: "hover",
  },
  render: (args) => ({
    components: { LzTooltip,LzButton },
    setup() {
      return {
        args,
      };
    },
    template: `
      <LzTooltip v-bind="args">
        Hover me
      </LzTooltip>
    `,
  }),
};

export default meta;
