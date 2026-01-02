import { useCallback } from "react";
import { storage } from "@/src/utils/storage";
import Cookies from "js-cookie";

export const useStorage = () => {
    const setItem = useCallback((key: string, value: any) => {
        storage.setItem(key, value);
    }, []);

    const getItem = useCallback((key: string) => {
        return storage.getItem(key);
    }, []);

    const removeItem = useCallback((key: string) => {
        storage.removeItem(key);
    }, []);

    const setCookie = useCallback((key: string, value: string, options?: Cookies.CookieAttributes) => {
        storage.setCookie(key, value, options);
    }, []);

    const getCookie = useCallback((key: string) => {
        return storage.getCookie(key);
    }, []);

    const removeCookie = useCallback((key: string) => {
        storage.removeCookie(key);
    }, []);

    const setSession = useCallback((token: string) => {
        storage.setSession(token);
    }, []);

    const clearSession = useCallback(() => {
        storage.clearSession();
    }, []);

    return {
        setItem,
        getItem,
        removeItem,
        setCookie,
        getCookie,
        removeCookie,
        setSession,
        clearSession,
    };
};
