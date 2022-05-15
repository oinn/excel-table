import type { Ref } from 'vue';
import { onBeforeUnmount, onMounted } from 'vue';

type FunctionType = ((event: MouseEvent) => void) | undefined;

// eslint-disable-next-line import/prefer-default-export
export function useClickOutside(elTargetRef: Ref<HTMLElement>, callback: () => void): FunctionType {
  if (!elTargetRef) {
    return;
  }

  const listener = (event: MouseEvent): void => {
    if (event.target === elTargetRef.value || event.composedPath().includes(elTargetRef.value)) {
      return;
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener('click', listener);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('click', listener);
  });

  // eslint-disable-next-line consistent-return
  return listener;
}
