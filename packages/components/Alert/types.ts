export type AlertType = "success" | "info" | "warning" | "danger";
export interface AlertProps {
  type?: AlertType;
  title?: string;
  description?: string;
  closable?: boolean;
  center?: boolean;
  showIcon?: boolean;
  effect?: "light" | "dark";
  onClose?: () => void;
}
export interface AlertEmits {
  (e: "close"): void;
}
export interface AlertInstance {
  open(): void;
  close(): void;
}
