// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen.js';
import TodoListScreen from '../screens/main/TodoListScreen';
import TodoDetailScreen from '../screens/main/TodoDetailScreen';
import CreateTodoScreen from '../screens/main/CreateTodoScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
);

const MainStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="TodoList" component={TodoListScreen} options={{ title: 'My Todos' }} />
        <Stack.Screen name="TodoDetail" component={TodoDetailScreen} options={{ title: 'Todo Details' }} />
        <Stack.Screen name="CreateTodo" component={CreateTodoScreen} options={{ title: 'Create Todo' }} />
    </Stack.Navigator>
);

const AppNavigator = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
