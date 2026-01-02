import { useState, useEffect } from 'react';
import { Todo, ConfirmModalState, DetailModalState } from '@/src/todolist/types';
import toast from 'react-hot-toast';
import { useTodoApi } from '@/src/hooks/useTodoApi';
import { useAuth } from '@/src/hooks/useAuth';

export const useTodoManager = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const { fetchTodos: getTodos, createTodo, updateTodo, deleteTodo, loading: apiLoading } = useTodoApi();
    const { logout } = useAuth();
    const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
        isOpen: false,
        todoId: null
    });
    const [detailModal, setDetailModal] = useState<DetailModalState>({
        isOpen: false,
        todo: null
    });

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            if (data) {
                setTodos(data.todos);
            }
        } catch (error: any) {
            toast.error(error.message || 'Network error while fetching todos');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        try {
            if (editingId) {
                const data = await updateTodo(editingId, { title, description });
                if (data) {
                    await fetchTodos();
                    setEditingId(null);
                    setTitle('');
                    setDescription('');
                    toast.success('Todo updated successfully!');
                }
            } else {
                const data = await createTodo({ title, description });
                if (data) {
                    await fetchTodos();
                    setTitle('');
                    setDescription('');
                    toast.success('Todo created successfully!');
                }
            }
        } catch (error: any) {
            toast.error(error.message || 'Network error while saving todo');
        }
    };

    const handleEdit = (todo: Todo) => {
        setTitle(todo.title);
        setDescription(todo.description);
        setEditingId(todo._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = (id: string) => {
        setConfirmModal({ isOpen: true, todoId: id });
    };

    const handleDelete = async () => {
        const id = confirmModal.todoId;
        setConfirmModal({ isOpen: false, todoId: null });

        if (!id) return;

        try {
            const data = await deleteTodo(id);
            if (data) {
                await fetchTodos();
                toast.success('Todo deleted successfully!');
            }
        } catch (error: any) {
            toast.error(error.message || 'Network error while deleting todo');
        }
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setEditingId(null);
    };

    const handleTodoClick = (todo: Todo) => {
        setDetailModal({ isOpen: true, todo });
    };

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully!');
    };

    return {
        todos,
        title,
        description,
        editingId,
        loading: apiLoading,
        confirmModal,
        detailModal,
        setTitle,
        setDescription,
        setConfirmModal,
        setDetailModal,
        handleSubmit,
        handleEdit,
        handleDeleteClick,
        handleDelete,
        handleCancel,
        handleTodoClick,
        handleLogout
    };
};
