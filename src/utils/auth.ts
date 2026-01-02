import { storage } from "@/src/utils/storage";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    exp?: number;
    [key: string]: any;
};

export const isTokenValid = (): boolean => {
    const token = storage.getCookie("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded.exp) return false;

        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;
    } catch (err) {
        return false;
    }
};
