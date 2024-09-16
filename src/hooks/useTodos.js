// src/hooks/useTodos.js
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchTodos();
    }, [user]);

    const fetchTodos = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('todos')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTodos(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (title, description = '') => {
        try {
            const { data, error } = await supabase
                .from('todos')
                .insert([{ title, description, user_id: user.id }])
                .single();

            if (error) throw error;
            setTodos([data, ...todos]);
        } catch (error) {
            setError(error.message);
        }
    };

    const updateTodo = async (id, updates) => {
        try {
            const { error } = await supabase
                .from('todos')
                .update(updates)
                .eq('id', id);

            if (error) {
                throw error;
            }
            setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo));
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const { error } = await supabase
                .from('todos')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        todos,
        loading,
        error,
        addTodo,
        updateTodo,
        deleteTodo,
        refreshTodos: fetchTodos,
    };
};
