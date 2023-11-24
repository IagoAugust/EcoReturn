import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { TouchableOpacity, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { VendorProduct } from "../screens/VendorProduct";
import { OrdersProgress } from "../screens/OrdersProgress";
import { Shop } from "../screens/Shop";

export function InsideRoutes(){
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    
    const ProfileButton = () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
        >
            <FontAwesome name="user-circle-o" size={28} color="#000" />
        </TouchableOpacity>
    );


    return(
        <Stack.Navigator 
            screenOptions={{
                headerStyle: { backgroundColor: '#add185' },
                headerTitleAlign: 'center',
                headerLeft: () => <ProfileButton />,
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={Home}
            >
            </Stack.Screen>
            <Stack.Screen name="Profile" component={Profile} options={{title:"Perfil"}} />
            <Stack.Screen name="VendorProduct" component={VendorProduct} options={{title:"Solicitação de Pedido"}} />
            <Stack.Screen name="OrdersProgress" component={OrdersProgress} options={{title:"Pedidos em Andamento"}} />
            <Stack.Screen name="Shop" component={Shop} options={{title:"Shop"}} />
        </Stack.Navigator>
    );
}

