export default function debounce(
  func: Function,
  wait: any,
  immediate?: any
): (...args: any[]) => any {
  let timeout;
  return function(...args: any[]) {
    const context = this;

    const later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
