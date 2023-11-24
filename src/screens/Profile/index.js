import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

export function Profile (){
    const route = useRoute();
    return(
        <View>
            <Text>Profile user</Text>
            <Text>{route.name}</Text>
        </View>
    );
}