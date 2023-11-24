import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppRoutes } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes/routes';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
