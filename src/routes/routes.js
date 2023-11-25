import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../services/FirebaseConfig';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Home } from '../screens/Home';
import { Profile } from "../screens/Profile";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { VendorProduct } from "../screens/VendorProduct";
import { OrdersProgress } from "../screens/OrdersProgress";
import { Shop } from "../screens/Shop";

const Stack = createNativeStackNavigator();

export function Routes() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const ProfileButton = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile")}
    >
      <FontAwesome name="user-circle-o" size={28} color="#000" />
    </TouchableOpacity>
  );

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user);
    });
  }, []);

  return (
  
    <Stack.Navigator initialRouteName='Login' 
      screenOptions={{
        headerStyle: { backgroundColor: '#add185' },
        headerTitleAlign: 'center',
        headerLeft: () => <ProfileButton />,
      }}
    >
      {user ? (
          // <Stack.Screen name='InsideRoutes' component={InsideRoutes}  options={{ headerShown: false }} />
          <>
            <Stack.Screen name="Home" component={Home} options={{title:"Tela Inicial"}} />
            <Stack.Screen name="Profile" component={Profile} options={{title:"Perfil"}} />
            <Stack.Screen name="VendorProduct" component={VendorProduct} options={{title:"Solicitação de Pedido"}} />
            <Stack.Screen name="OrdersProgress" component={OrdersProgress} options={{title:"Pedidos em Andamento"}} />
            <Stack.Screen name="Shop" component={Shop} options={{title:"Shop"}} />
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/> 
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/> 
          </>
        ) 
      }
    </Stack.Navigator>
    
  );
}

