// src/screens/main/TodoDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useTodos } from '../../hooks/useTodos';

const TodoDetailScreen = ({ route, navigation }) => {
    const { todo } = route.params;
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || '');
    const { updateTodo } = useTodos();

    useEffect(() => {
        console.log('Todo:', todo);
        console.log('Description state:', description);
    }, [todo, description]);

    const validateInput = () => {
        if (title.trim().length === 0) {
            Alert.alert('Validation Error', 'Title is required');
            return false;
        }
        if (title.trim().length > 100) {
            Alert.alert('Validation Error', 'Title must be 100 characters or less');
            return false;
        }
        if (description.trim().length > 500) {
            Alert.alert('Validation Error', 'Description must be 500 characters or less');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        console.log("Saving: " + description)

        if (validateInput()) {
            try {
                await updateTodo(todo.id, {
                    title: title.trim(),
                    description: description.trim()
                });
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', 'Failed to update todo. Please try again.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Todo title"
                maxLength={100}
            />
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                multiline
                maxLength={500}
            />
            <Button
                title="Save"
                onPress={() => {
                    handleSave();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default TodoDetailScreen;
