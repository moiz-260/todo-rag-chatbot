import { useState, useCallback } from "react";
import axiosInstance from "@/src/utils/axiosInstance";
import { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const callApi = useCallback(async <T>(
        config: AxiosRequestConfig
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const response: AxiosResponse<T> = await axiosInstance(config);
            return response.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.message || "An unexpected error occurred";
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const get = useCallback(<T>(url: string, config?: AxiosRequestConfig) =>
        callApi<T>({ ...config, method: "GET", url }), [callApi]);

    const post = useCallback(<T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        callApi<T>({ ...config, method: "POST", url, data }), [callApi]);

    const put = useCallback(<T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        callApi<T>({ ...config, method: "PUT", url, data }), [callApi]);

    const del = useCallback(<T>(url: string, config?: AxiosRequestConfig) =>
        callApi<T>({ ...config, method: "DELETE", url }), [callApi]);

    return {
        loading,
        error,
        get,
        post,
        put,
        del,
    };
};
