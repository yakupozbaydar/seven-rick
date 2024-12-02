export const debounce = (
  func: (...args: any[]) => void,
  delay: number,
): ((...args: any[]) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
