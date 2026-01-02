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
    setSession: (token: string, user: any) => {
        storage.setItem("token", token);
        storage.setItem("user", user);
        storage.setItem("email", user.email);
        storage.setCookie("token", token);
        storage.setCookie("userId", user.id || user._id);
        storage.setCookie("email", user.email);
    },
    clearSession: () => {
        storage.removeItem("token");
        storage.removeItem("user");
        storage.removeItem("email");
        storage.removeCookie("token");
        storage.removeCookie("userId");
        storage.removeCookie("email");
    }
};
