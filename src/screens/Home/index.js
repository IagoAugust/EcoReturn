import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { FIREBASE_AUTH } from '../../services/FirebaseConfig';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export function Home(){
    
    const { user, updateRedirectToHome } = useAuth();
    const navigation = useNavigation();

    function HandleVendorProduct(){
        navigation.navigate("VendorProduct");
    };

    function HandleOrdersProgress(){
        navigation.navigate("OrdersProgress");
    };

    function HandleShop(){
        navigation.navigate("Shop");
    };

    function HandleLogout(){
        FIREBASE_AUTH.signOut();
        updateRedirectToHome(false);
    };

    return(
        <View style={styles.container}>    
            
            <Text style={styles.subTitle} >Seja bem-vindo {user.name}</Text>

            <TouchableOpacity style={styles.button} onPress={HandleVendorProduct} >
                <Text style={styles.buttonText}>Solicitar Pedido</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={HandleOrdersProgress} >
                <Text style={styles.buttonText}>Pedidos em andamento</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.floatingButton} onPress={HandleShop} >
                <MaterialIcons name="shopping-cart" size={35} color="black" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={HandleLogout}>
                <Text style={{ backgroundColor:'#3880c2'}} >Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
