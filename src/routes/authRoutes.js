import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { InsideRoutes } from './insideRoutes';
    
export function AuthRoutes() {
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/> 
      <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/> 
    </Stack.Navigator>
    
  );
}

