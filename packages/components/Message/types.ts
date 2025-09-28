import type { VNode, ComponentInternalInstance, Ref } from "vue";

export const messageTypes = [
  "success",
  "info",
  "warning",
  "danger",
  "error",
] as const;
export type MessageType = (typeof messageTypes)[number];
export interface MessageHandler {
  close(): void;
}
export type MessageOptions = Partial<Omit<MessageProps, "id">>;
export type MessageParams = string | VNode | MessageOptions;
export type MessageFn = {
  (options: MessageParams): MessageHandler;
  closeAll(type?: MessageType): void;
};
export type MessageTypeFn = (props: MessageParams) => MessageHandler;
export interface Message extends MessageFn {
  success: MessageTypeFn;
  info: MessageTypeFn;
  warning: MessageTypeFn;
  danger: MessageTypeFn;
  error: MessageTypeFn;
}
export interface MessageProps {
  id?: string;
  message?: string | VNode | (() => VNode);
  duration?: number;
  showClose?: boolean;
  center?: boolean;
  type?: MessageType;
  offset?: number;
  zIndex?: number;
  transitionName?: string;
  onDestroy: () => void;
}
export interface MessageInstance {
  id: string;
  vnode: VNode;
  props: MessageProps;
  handler: MessageHandler;
  vm: ComponentInternalInstance;
}

export interface MessageCompInstance {
  close(): void;
  bottomOffset: Ref<number>;
}

export type CreateMessageProps = Omit<
  MessageProps,
  "id" | "onDestroy" | "zIndex"
>;
