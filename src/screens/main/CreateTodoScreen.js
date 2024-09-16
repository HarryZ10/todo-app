// src/screens/main/CreateTodoScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useTodos } from '../../hooks/useTodos';

const CreateTodoScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addTodo } = useTodos();

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

    const handleCreate = async () => {
        if (validateInput()) {
            try {
                await addTodo(title.trim(), description.trim());
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', 'Failed to create todo. Please try again.');
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
                placeholder="Description (optional)"
                multiline
                maxLength={500}
            />
            <Button title="Create Todo" onPress={handleCreate} />
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

export default CreateTodoScreen;
