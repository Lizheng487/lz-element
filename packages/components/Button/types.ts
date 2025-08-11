import type { Component, ComputedRef } from "vue";
import type { Ref } from "vue";
// 定义按钮的类型
export type ButtonType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type ButtonSize = "small" | "default" | "large";
export type ButtonNativeType = "button" | "submit" | "reset";

export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: ButtonNativeType;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  circle?: boolean;
  plain?: boolean;
  round?: boolean;
  autofocus?: boolean;
  useThrottle?: boolean;
  throttleDuration?: number;
  loadingIcon?: string;
  onClick?: (event: MouseEvent) => void;
}
export interface ButtonGroupProps {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
}

export interface ButtonGroupContext {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
}

export interface ButtonEmits {
  (e: "click", event: MouseEvent): void;
}
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
  disabled: ComputedRef<boolean>;
  size: ComputedRef<ButtonSize | "">;
  type: ComputedRef<ButtonType | "">;
}
