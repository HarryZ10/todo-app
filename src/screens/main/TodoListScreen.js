// src/screens/main/TodoListScreen.js
import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native'; 
import { useTodos } from '../../hooks/useTodos';

const TodoItem = ({ item, onPress, onComplete, onDelete }) => (
    <View style={styles.todoItem}>
        <TouchableOpacity onPress={() => onComplete(item)}>
            <Text style={item.is_complete ? styles.completedTodo : styles.todo}>{item.title}</Text>
        </TouchableOpacity>
        <View style={styles.actions}>
            <TouchableOpacity onPress={() => onPress(item)}>
                <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item)}>
                <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const TodoListScreen = ({ navigation }) => {

    const {
        todos,
        loading,
        error,
        addTodo,
        updateTodo,
        deleteTodo,
        refreshTodos
    } = useTodos();

    const handleCreateTodo = () => {
        navigation.navigate('CreateTodo');
    };

    const handleEditTodo = (todo) => {
        navigation.navigate('TodoDetail', { todo });
    };

    const handleCompleteTodo = async (todo) => {
        try {
            await updateTodo(todo.id, { is_complete: !todo.is_complete });
        } catch (error) {
            Alert.alert('Error', 'Failed to update todo. Please try again.');
        }
    };

    const handleDeleteTodo = async (todo) => {
        try {
            await deleteTodo(todo.id);
        } catch (error) {
            Alert.alert('Error', 'Failed to delete todo. Please try again.');
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text>An error occurred: {error.message}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refreshTodos}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.createButton} onPress={handleCreateTodo}>
                <Text style={styles.createButtonText}>Create New Todo</Text>
            </TouchableOpacity>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TodoItem
                        item={item}
                        onPress={handleEditTodo}
                        onComplete={handleCompleteTodo}
                        onDelete={handleDeleteTodo}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyListText}>No todos yet. Create one to get started!</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    todo: {
        fontSize: 16,
    },
    completedTodo: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
    },
    editButton: {
        marginRight: 10,
        color: 'blue',
    },
    deleteButton: {
        color: 'red',
    },
    createButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    createButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    retryButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
});

export default TodoListScreen;
