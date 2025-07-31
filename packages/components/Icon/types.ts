import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface IconProps {
  icon: object | Array<string> | string |IconDefinition;
  spin?: boolean;
  size?: |"2xs" | "1x" | "xs" | "sm" | "lg" | "xl" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x";
  type?: "primary" | "success" | "warning" | "info" | "danger";
  color?: string;
}