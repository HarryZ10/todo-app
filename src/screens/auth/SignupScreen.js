// src/screens/auth/SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signUp } = useAuth();

    const validateInput = () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Validation Error', 'All fields are required');
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert('Validation Error', 'Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        if (validateInput()) {
            try {
                const { error } = await signUp({ email, password });
                if (error) throw error;
                Alert.alert('Success', 'Account created successfully. Please log in.');
                navigation.navigate('Login');
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignup} />
            <Button
                title="Already have an account? Log In"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default SignupScreen;
