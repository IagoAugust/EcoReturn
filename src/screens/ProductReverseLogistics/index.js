import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export function ProductReverseLogistics({ route }) {
    const navigation = useNavigation();
    const { storeId, storeName  } = route.params;

    useEffect(() => {
        const storeNameHeader = storeName || 'Produto';
        navigation.setOptions({ title: storeNameHeader });
    }, [storeName]);

    return (
        <View>
            <Text>Produtos</Text>
        </View>
    );
}
