import Cookies from "js-cookie";

export const storage = {
    setItem: (key: string, value: any) => {
        const stringValue = typeof value === "string" ? value : JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    },
    getItem: (key: string) => {
        return localStorage.getItem(key);
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key);
    },
    setCookie: (key: string, value: string, options?: Cookies.CookieAttributes) => {
        Cookies.set(key, value, options || { expires: 7 });
    },
    getCookie: (key: string) => {
        return Cookies.get(key);
    },
    removeCookie: (key: string) => {
        Cookies.remove(key);
    },
    setSession: (token: string) => {
        storage.setItem("token", token);
        storage.setCookie("token", token);
    },
    clearSession: () => {
        storage.removeItem("token");
        storage.removeCookie("token");
    }
};
