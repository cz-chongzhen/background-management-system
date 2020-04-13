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

type ele = string | number | boolean | undefined | null;
/**
 * 一维数组去重
 * @param arr 要去重的数组
 * @returns {unknown[]}
 */
export const czArrRepeat = (arr: Array<ele>): Array<ele> => Array.from(new Set(arr));

/**
 * 对象类型元素的数组去重
 * @param arr 要去重的数组
 * @param key  对象的key
 * @returns {*}
 */
export const czArrayRepeatByKey = (arr: object[], key: string) => {
    let obj: any = {};
    return arr.reduce((current: any, next: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        obj[next[key]] ? "" : obj[next[key]] = true && current.push(next);
        return current;
    }, [])
};