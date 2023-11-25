import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";

export function StoreReverseLogistics({ navigation }){
    const [reverseLogisctics, setReverseLogisctics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'storeReverseLogistics'));
                const data = querySnapshot.docs.map(doc => {
                    const { logoUrl, name } = doc.data();
                    return { id: doc.id, logoUrl, name };
                });
                setReverseLogisctics(data);
            } catch (error) {
                console.error('Erro ao buscar dados do Firestore:', error);
            }
        };
    
        fetchData();
    }, []);
    const navigateToProducts = (storeId, storeName) =>{
        navigation.navigate('ProductReverseLogistics', { storeId, storeName });
        // console.log(storeId, storeName);
    };

    return(
        <View>
            <Text>Escolha a empresa de Logística reversa:</Text>
            <FlatList
                data={reverseLogisctics}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToProducts(item.id, item.name)}>
                    <Image source={{uri: item.logoUrl}} style={{width: 50, height: 50}} />
                    <Text>{item.name}</Text>
                </TouchableOpacity>
                )}
            />
        </View>
    );
}   