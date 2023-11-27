import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./styles";

export function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersQuery = query(
                    collection(FIRESTORE_DB, 'orders'),
                    where('uidUser', '==', user.uid)
                );

                const querySnapshot = await getDocs(ordersQuery);
                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setOrders(ordersData);
            } catch (error) {
                console.error('Erro ao buscar ordens no Firestore:', error);
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.orderContainer}>
                        <Image source={{ uri: item.imageUrl }} style={styles.logo} />
                        <View style={styles.orderDetails}>
                            <View style={styles.containerText}>
                                <Text style={styles.label}>Nome do Produto:</Text>
                                <Text style={[styles.input, styles.productName]} numberOfLines={1} ellipsizeMode="tail">
                                    {item.productName}
                                </Text>
                            </View>
                            <View style={styles.containerText}>
                                <Text style={styles.label}>Quantidade:</Text>
                                <Text style={[styles.input, styles.quantity]}>{item.quantity}</Text>
                            </View>
                            <View style={styles.status}>
                                <Text style={styles.label}>Status:</Text>
                                <Text style={[
                                    styles.input,
                                    styles.status,
                                    item.status === 'Em Andamento' ? styles.inProgress :
                                    item.status === 'completed' ? styles.completed :
                                    item.status === 'cancelled' ? styles.cancelled : null ]}
                                >
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

