import { atom } from "jotai";

export type ToastType = "success" | "error" | "warning";

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

export const toastsAtom = atom<Toast[]>([]);

export const addToastAtom = atom(
    null,
    (get, set, toast: Omit<Toast, "id">) => {
        const id = Date.now();
        set(toastsAtom, [...get(toastsAtom), { id, ...toast }]);
    }
);

export const removeToastAtom = atom(
    null,
    (get, set, id: number) => {
        set(
            toastsAtom,
            get(toastsAtom).filter(t => t.id !== id)
        );
    }
);
