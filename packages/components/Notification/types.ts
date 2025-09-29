import type { VNode, Ref, ComponentInternalInstance } from "vue";

export const notificationTypes = [
  "info",
  "success",
  "warning",
  "danger",
] as const;
export type NotificationType = (typeof notificationTypes)[number];
export const notificationPosition = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;
export type NotificationPosition = (typeof notificationPosition)[number];

export interface NotificationProps {
  id: string;
  title: string;
  zIndex: number;
  position: NotificationPosition;
  type?: NotificationType;
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  offset?: number;
  transitionName?: string;
  icon?: string;
  onClick?(): void;
  onClose?(): void;
  onDestroy: () => void;
}
export interface NotificationInstance {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: NotificationProps;
  handler: NotificationHandler;
}
export interface NotificationCompInstance {
  close(): void;
  bottomOffset: Ref<number>;
}
export interface NotificationHandler {
  close(): void;
}
export type CreateNotificationProps = Omit<
  NotificationProps,
  "id" | "onDestroy" | "zIndex"
>;
export type NotificationOptions = Partial<Omit<NotificationProps, "id">>;
export type NotificationParams = string | VNode | NotificationOptions;
export type NotificationFn = {
  (options: NotificationParams): NotificationHandler;
  closeAll(type?: NotificationType): void;
};
export type NotificationTypeFn = (
  props: NotificationParams
) => NotificationHandler;

export interface Notification extends NotificationFn {
  success: NotificationTypeFn;
  info: NotificationTypeFn;
  warning: NotificationTypeFn;
  danger: NotificationTypeFn;
}
