import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export function Home(){
    
    const { user, updateRedirectToHome } = useAuth();
    const navigation = useNavigation();

    function HandleVendorProduct(){
        navigation.navigate("Store");
    };

    function HandleOrders(){
        navigation.navigate("Orders");
    };

    function HandleShop(){
        navigation.navigate("Shop");
    };

    function HandleOrderApproval(){
        navigation.navigate("OrderApproval")
    };



    return(
        <View style={styles.container}>    
            
            <Text style={styles.subTitle} >Seja bem-vindo {user.name}</Text>

            <TouchableOpacity style={styles.button} onPress={HandleVendorProduct} >
                <Text style={styles.buttonText}>Solicitar Pedido</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={HandleOrders} >
                <Text style={styles.buttonText}>Visualizar Pedidos</Text>
            </TouchableOpacity>

            {user.typeUser === 'admin' && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={HandleOrderApproval}
                >
                    <Text style={styles.buttonText}>Aprovação de Pedidos</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.floatingButton} onPress={HandleShop} >
                <MaterialIcons name="shopping-cart" size={35} color="black" />
            </TouchableOpacity>
        </View>
    );
}
