import { useCallback } from "react";
import { useApi } from "./useApi";
import { SignInFormData, SignUpFormData } from "../types/auth";
import { useStorage } from "./useStorage";

export const useAuth = () => {
    const { post, loading, error } = useApi();
    const { setSession, clearSession, removeItem } = useStorage();

    const login = useCallback(async (data: SignInFormData) => {
        const result = await post<any>("/api/auth/signin", data);
        if (result) {
            setSession(result.token, result.user);
            removeItem("signin-form");
        }
        return result;
    }, [post, setSession, removeItem]);

    const register = useCallback(async (data: SignUpFormData) => {
        const result = await post<any>("/api/auth/signup", {
            fullName: data.fullName,
            dateOfBirth: data.dateOfBirth,
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: data.password,
        });
        if (result) {
            setSession(result.token, result.user);
            removeItem("signup-form");
        }
        return result;
    }, [post, setSession, removeItem]);

    const logout = useCallback(() => {
        clearSession();
        window.location.href = "/";
    }, [clearSession]);

    return {
        login,
        register,
        logout,
        loading,
        error,
    };
};
