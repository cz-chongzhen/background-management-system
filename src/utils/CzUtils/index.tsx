/**
 * 防抖函数
 * @param fn
 * @param delay
 */
export const czDebounce = (fn: Function, delay: number = 1000): Function => {
    let timer: any;
    return function (this: any) {
        if (timer) {
            clearTimeout(timer);
        }
        const args = arguments;
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
};