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
const InsideStack = createNativeStackNavigator();


function InsideRoutes(){
  const navigation = useNavigation();
  
  const ProfileButton = () => (
      <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
      >
          <FontAwesome name="user-circle-o" size={28} color="#000" />
      </TouchableOpacity>
  );


  return(
      <InsideStack.Navigator 
          screenOptions={{
              headerStyle: { backgroundColor: '#add185' },
              headerTitleAlign: 'center',
              headerLeft: () => <ProfileButton />,
          }}
      >
          <InsideStack.Screen 
              name="Home" 
              component={Home}
              // initialParams={}
          >
          </InsideStack.Screen>
          <InsideStack.Screen name="Profile" component={Profile} options={{title:"Perfil"}} />
          <InsideStack.Screen name="VendorProduct" component={VendorProduct} options={{title:"Solicitação de Pedido"}} />
          <InsideStack.Screen name="OrdersProgress" component={OrdersProgress} options={{title:"Pedidos em Andamento"}} />
          <InsideStack.Screen name="Shop" component={Shop} options={{title:"Shop"}} />
      </InsideStack.Navigator>
  );
}



export function Routes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user);
    });
  }, []);

  return (
  
    <Stack.Navigator initialRouteName='Login'>
      {user ? (
          <Stack.Screen name='InsideRoutes' component={InsideRoutes}  options={{ headerShown: false }} />
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

