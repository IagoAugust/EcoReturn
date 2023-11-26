import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";
import { useAuth } from "../../context/AuthContext";

export function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Consulta para obter todas as ordens do usuário logado
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
        <View>
            <Text>Pedidos em andamento:</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50 }} />
                        <Text>Nome do Produto: {item.productName}</Text>
                        <Text>Quantidade: {item.quantity}</Text>
                        <Text>Status: {item.status}</Text>
                        {/* Adicione mais informações conforme necessário */}
                    </View>
                )}
            />
        </View>
    );
}
