import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";

export function Profile (){

    const {user} = useAuth();

    return(
        <View>
            <Text>Profile user {user.name} </Text>
        </View>
    );
}