"use client";

import { useEffect, useRef } from "react";
import { UseFormReturn, Path, PathValue } from "react-hook-form";
import { useStorage } from "./useStorage";

interface UseFormPersistenceOptions<TFieldValues extends Record<string, any>> {
    formId: string;
    formMethods: UseFormReturn<TFieldValues>;
    persistFields: (keyof TFieldValues)[];
}

export const useFormPersistence = <
    TFieldValues extends Record<string, any>
>({
    formId,
    formMethods,
    persistFields,
}: UseFormPersistenceOptions<TFieldValues>) => {
    const { watch, setValue } = formMethods;
    const { setItem, getItem } = useStorage();
    const hasRestored = useRef(false);

    const storageKey = `form_persistence_${formId}`;

    useEffect(() => {
        if (hasRestored.current) return;

        const savedData = getItem(storageKey);
        if (!savedData) return;

        try {
            const parsedData = JSON.parse(savedData) as Partial<TFieldValues>;

            persistFields.forEach((field) => {
                const value = parsedData[field];
                if (value !== undefined) {
                    setValue(
                        field as Path<TFieldValues>,
                        value as PathValue<TFieldValues, Path<TFieldValues>>,
                        { shouldDirty: false, shouldValidate: false }
                    );
                }
            });

            hasRestored.current = true;
        } catch (error) {

        }
    }, [persistFields, setValue, storageKey, getItem]);

    useEffect(() => {
        const subscription = watch((values) => {
            const dataToPersist = persistFields.reduce(
                (acc, field) => {
                    acc[field] = (values as any)[field];
                    return acc;
                },
                {} as Partial<TFieldValues>
            );

            setItem(storageKey, dataToPersist);
        });

        return () => subscription.unsubscribe();
    }, [persistFields, storageKey, watch, setItem]);
};
