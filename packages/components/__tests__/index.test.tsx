import type { Plugin } from "vue";
import { describe, it, expect } from "vitest";
import {
  LzAlert,
  LzButton,
  LzButtonGroup,
  LzCollapse,
  LzCollapseItem,
  LzIcon,
  LzTooltip,
} from "..";
import { get, map } from "lodash-es";

const comps = [
  LzAlert,
  LzButton,
  LzButtonGroup,
  LzCollapse,
  LzCollapseItem,
  LzIcon,
  LzTooltip
] as Plugin[];

describe("components/index", () => {
  it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
    "%s should be exported",
    (_, component) => {
      expect(component).toBeDefined();
      expect(component.install).toBeDefined();
    }
  );
});
