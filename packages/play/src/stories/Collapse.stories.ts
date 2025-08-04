import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { LzCollapse, LzCollapseItem } from "lz-element";
// import 'lz-element/dist/theme/Collapse.css'

type Story = StoryObj<typeof LzCollapse>;

const meta: Meta<typeof LzCollapse> = {
  title: "Example/Collapse",
  component: LzCollapse,
  subcomponents: { LzCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      LzCollapse,
      LzCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <lz-collapse v-bind="args">
      <lz-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </lz-collapse-item>
      <lz-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </lz-collapse-item>
      <lz-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </lz-collapse-item>
    </lz-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;
