import axios from "axios";
import { storage } from "@/src/utils/storage";

const axiosInstance = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = storage.getCookie("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            storage.removeCookie("token");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
