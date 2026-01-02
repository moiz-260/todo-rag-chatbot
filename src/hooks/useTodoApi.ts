import { useCallback } from "react";
import { useApi } from "@/src/hooks/useApi";
import { Todo } from "@/src/todolist/types";

export function useTodoApi() {
    const { get, post, put, del, loading, error } = useApi();

    const fetchTodos = useCallback(async () => {
        return await get<{ todos: Todo[] }>("/api/todos");
    }, [get]);

    const createTodo = useCallback(async (todoData: { title: string; description: string }) => {
        return await post<any>("/api/todos", todoData);
    }, [post]);

    const updateTodo = useCallback(async (id: string, todoData: { title: string; description: string }) => {
        return await put<any>(`/api/todos/${id}`, todoData);
    }, [put]);

    const deleteTodo = useCallback(async (id: string) => {
        return await del<any>(`/api/todos/${id}`);
    }, [del]);

    return {
        fetchTodos,
        createTodo,
        updateTodo,
        deleteTodo,
        loading,
        error,
    };
}
