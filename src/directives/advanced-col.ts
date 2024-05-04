import { Directive, DirectiveBinding } from 'vue';

const vAdvancedCol: Directive = {

  mounted(element: HTMLElement, binding: DirectiveBinding<{[key: number]: number}>) {
    new ResizeObserver(() => {
      const width = element.parentElement?.offsetWidth || 0;
      const conditions = binding.value;
      const keys = Object.keys(binding.value);
      for (let i = 0; i < keys.length; i++) {
        const key = parseInt(keys[i]);
        const value = conditions[key];
        element.classList.remove('v-col-' + value);
      }
      for (let i = 0; i < keys.length; i++) {
        const key = parseInt(keys[i]);
        if (width < key) {
          const value = conditions[key];
          element.classList.add('v-col-' + value);
          break;
        }
      }
    }).observe(element);
  },
}
export default vAdvancedCol;
