import { defer, delay, isNil, isString } from "lodash-es";
import type { LoadingOptions, LoadingOptionsResolved } from "./types";
import { useZIndex } from "@lz-element/hooks";
import { createApp, nextTick, reactive, ref } from "vue";
import LoadingComp from "./Loading.vue";

const RELATEIVE_CLASS = "lz-loading-parent--relative" as const;
const HIDDEN_CLASS = "lz-loading-parent--hiden" as const;
const LOADING_NUMBER_KEY = "lz-loading-number" as const;

const instanceMap: Map<HTMLElement, LoadingInstance> = new Map();
const { nextZIndex } = useZIndex(30000);
function addRelativeClass(target: HTMLElement = document.body) {
  target.classList.add(RELATEIVE_CLASS);
}
function removeRelativeClass(target: HTMLElement = document.body) {
  target.classList.remove(RELATEIVE_CLASS);
}
function addHiddenClass(target: HTMLElement = document.body) {
  target.classList.add(HIDDEN_CLASS);
}
function removeHiddenClass(target: HTMLElement = document.body) {
  target.classList.remove(HIDDEN_CLASS);
}
function getLoadingNumber(target: HTMLElement = document.body) {
  return target.getAttribute(LOADING_NUMBER_KEY);
}
function removeLoadingNumber(target: HTMLElement = document.body) {
  target.removeAttribute(LOADING_NUMBER_KEY);
}
function addLoadingNumber(target: HTMLElement = document.body) {
  const number = getLoadingNumber(target) ?? "0";
  target.setAttribute(LOADING_NUMBER_KEY, `${Number.parseInt(number) + 1}`);
}
function subLoadingNumber(target: HTMLElement = document.body) {
  const number = getLoadingNumber(target);
  if (number) {
    const newNumber = Number.parseInt(number) - 1;
    if (newNumber === 0) {
      removeLoadingNumber(target);
    } else {
      target.setAttribute(LOADING_NUMBER_KEY, `${newNumber}`);
    }
  }
}
function addClass(opts: LoadingOptions, target: HTMLElement = document.body) {
  if (opts.lock) {
    addHiddenClass(target);
  } else {
    removeHiddenClass(target);
  }
  addRelativeClass(target);
}
function createLoading(opts: LoadingOptionsResolved) {
  const visible = ref(opts.visible);
  const afterLeaveFlag = ref(false);
  const handleAfterLeave = () => {
    if (!afterLeaveFlag.value) return;
    destory();
  };
  const data = reactive({
    ...opts,
    onAfterLeave: handleAfterLeave,
  });
  const setText = (text: string) => (data.text = text);

  const app = createApp(LoadingComp, {
    ...data,
    zIndex: data.fullscreen ? nextZIndex() : void 0,
    visible,
  });
  const vm = app.mount(document.createElement("div"));
  const destory = () => {
    const target = data.parent;
    subLoadingNumber(target);
    if (getLoadingNumber(target)) return;
    delay(() => {
      removeRelativeClass(target);
      removeHiddenClass(target);
    }, 1);
    instanceMap.delete(target ?? document.body);
    vm.$el?.parentNode?.removeChild(vm.$el);
    app.unmount();
  };
  let afterLeaveTimer: number;
  const close = () => {
    if (opts.beforeClose && !opts.beforeClose()) return;
    afterLeaveFlag.value = true;
    clearTimeout(afterLeaveTimer);
    afterLeaveTimer = defer(handleAfterLeave);
    visible.value = false;
    opts.closed?.();
  };
  return {
    get $el(): HTMLElement {
      return vm.$el;
    },
    vm,
    close,
    visible,
    setText,
  };
}

function resolveOptions(options: LoadingOptions): LoadingOptionsResolved {
  let target: HTMLElement;
  if (isString(options.target)) {
    target = document.querySelector(options.target) ?? document.body;
  } else {
    target = options.target ?? document.body;
  }
  return {
    parent: target === document.body || options.body ? document.body : target,
    background: options.background ?? "rgba(0, 0, 0, 0.5)",
    spinner: options.spinner,
    text: options.text,
    fullscreen: target === document.body && (options.fullscreen ?? true),
    lock: options.lock ?? false,
    visible: options.visible ?? true,
    target,
  };
}
let fullscreenInstance: LoadingInstance | null = null;

export type LoadingInstance = ReturnType<typeof createLoading>;
export function Loading(options: LoadingOptions = {}): LoadingInstance {
  const resolved = resolveOptions(options);
  const target = resolved.parent ?? document.body;
  if (resolved.fullscreen && !isNil(fullscreenInstance)) {
    return fullscreenInstance;
  }
  addLoadingNumber(resolved?.parent);
  if (instanceMap.has(target)) {
    return instanceMap.get(target)!;
  }
  const instance = createLoading({
    ...resolved,
    closed: () => {
      resolved.closed?.();
      if (resolved.fullscreen) {
        fullscreenInstance = null;
      }
    },
  });
  addClass(options, resolved?.parent);
  resolved.parent?.appendChild(instance.$el);
  nextTick(() => (instance.visible.value = !!resolved.visible));
  if (resolved.fullscreen) {
    fullscreenInstance = instance;
  }
  instanceMap.set(target, instance);
  return instance;
}
