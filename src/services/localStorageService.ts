export const localStorageService = {

    getItem(key: string): string | null {
        return localStorage.getItem(key);
    },

    removeItem(key: string) {
        localStorage.removeItem(key);
    },

    getKey(index: number) {
        return localStorage.key(index)
    },

    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    },

}