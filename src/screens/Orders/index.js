import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native";

export function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');

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

    // Função para filtrar os pedidos com base no status selecionado
    const filterOrders = (status) => {
        if (status === 'all') {
            return orders;
        } else {
            return orders.filter(item => item.status === status);
        }
    };

    return (
        <View style={styles.container}>

            {/* Adicione botões para selecionar o status */}
            <View style={styles.statusFilterContainer}>
                <TouchableOpacity
                    style={[
                    styles.statusFilterButton,
                    selectedStatus === 'all' && styles.selectedFilterButton
                    ]}
                    onPress={() => setSelectedStatus('all')}
                >
                    <Text style={styles.statusFilter}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                    styles.statusFilterButton,
                    selectedStatus === 'Em Andamento' && styles.selectedFilterButton
                    ]}
                    onPress={() => setSelectedStatus('Em Andamento')}
                >
                    <Text style={styles.statusFilter}>Em Andamento</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                    styles.statusFilterButton,
                    selectedStatus === 'completed' && styles.selectedFilterButton
                    ]}
                    onPress={() => setSelectedStatus('completed')}
                >
                    <Text style={styles.statusFilter}>Concluídos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                    styles.statusFilterButton,
                    selectedStatus === 'cancelled' && styles.selectedFilterButton
                    ]}
                    onPress={() => setSelectedStatus('cancelled')}
                >
                    <Text style={styles.statusFilter}>Cancelados</Text>
                </TouchableOpacity>
                </View>

            <FlatList
                data={filterOrders(selectedStatus)}
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

