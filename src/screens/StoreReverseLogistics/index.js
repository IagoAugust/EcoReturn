import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";

export function StoreReverseLogistics({ navigation }) {
    const [reverseLogistics, setReverseLogistics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'storeReverseLogistics'));
                const data = querySnapshot.docs.map(doc => {
                    const { logoUrl, name } = doc.data();
                    return { id: doc.id, logoUrl, name };
                });
                setReverseLogistics(data);
            } catch (error) {
                console.error('Erro ao buscar dados do Firestore:', error);
            }
        };

        fetchData();
    }, []);

    const navigateToProducts = (storeId, storeName) => {
        navigation.navigate('ProductReverseLogistics', { storeId, storeName });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.description}>Escolha a empresa de Logística reversa:</Text>
            <FlatList
                style={styles.containerCard}
                data={reverseLogistics}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigateToProducts(item.id, item.name)}
                    >
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.logoUrl }} style={styles.image} />
                        </View>
                        <Text style={styles.titleStore}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
