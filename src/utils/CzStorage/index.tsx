/**
 * 获取sessionStorage里面存储的数据
 * @param key ---- 数据的key
 */
export const getItem = (key: string): string | null => {
    if (!key) {
        throw new Error("key should not empty!")
    }
    return window.sessionStorage.getItem(key);
};

/**
 * 向sessionStorage里面存储数据
 * @param key 数据对应的key值
 * @param data 要存储的数据
 */
export const setItem = (key: string, data: string = ""): void => {
    if (!key) {
        throw new Error("key should not empty!")
    }
    window.sessionStorage.setItem(key, data);
};

/**
 * 按照key值清除缓存的数据
 * @param key
 */
export const clearItem = (key: string): void => {
    if (!key) {
        throw new Error("key should not empty!")
    }
    window.sessionStorage.removeItem(key);
};

/**
 * 清除sessionStorage里面所有缓存的数据
 */
export const clearAll = (): void => window.sessionStorage.clear();