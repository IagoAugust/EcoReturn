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
                                <Text style={[styles.input, styles.status, item.status === 'Em Andamento' ? styles.inProgress : styles.completed]}>
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


// import React, { useEffect, useState } from "react";
// import { Text, View, FlatList, Image, Animated } from "react-native";
// import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
// import { FIRESTORE_DB } from "../../services/FirebaseConfig";
// import { useAuth } from "../../context/AuthContext";
// import { Swipeable, RectButton } from "react-native-gesture-handler";

// export function Orders() {
//     const { user } = useAuth();
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const ordersQuery = query(
//                     collection(FIRESTORE_DB, 'orders'),
//                     where('uidUser', '==', user.uid)
//                 );

//                 const querySnapshot = await getDocs(ordersQuery);
//                 const ordersData = querySnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));

//                 setOrders(ordersData);
//             } catch (error) {
//                 console.error('Erro ao buscar ordens no Firestore:', error);
//             }
//         };

//         fetchOrders();
//     }, [user]);

//     const renderRightActions = (progress, dragX, orderId) => {
//         const trans = dragX.interpolate({
//             inputRange: [0, 50, 100],
//             outputRange: [0, 0, 1],
//         });

//         return (
//             <RectButton
//                 style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}
//                 onPress={() => handleDeleteOrder(orderId)}
//             >
//                 <Animated.Text
//                     style={{
//                         color: 'white',
//                         paddingHorizontal: 10,
//                         fontWeight: '600',
//                         transform: [{ translateX: trans }],
//                     }}
//                 >
//                     Excluir
//                 </Animated.Text>
//             </RectButton>
//         );
//     };

//     const handleDeleteOrder = async (orderId) => {
//         // Lógica para excluir a ordem no Firebase
//         try {
//             // Substitua o código abaixo pela lógica de exclusão no Firestore
//             console.log('Excluir ordem com ID:', orderId);
//             // await deleteDoc(doc(collection(FIRESTORE_DB, 'orders'), orderId));
//         } catch (error) {
//             console.error('Erro ao excluir ordem no Firestore:', error);
//         }
//     };

//     const renderItem = ({ item }) => (
//         <Swipeable
//             renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
//         >
//             <View>
//                 <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50 }} />
//                 <Text>Nome do Produto: {item.productName}</Text>
//                 <Text>Quantidade: {item.quantity}</Text>
//                 <Text>Status: {item.status}</Text>
//             </View>
//         </Swipeable>
//     );

//     return (
//         <View>
//             <Text>Pedidos em andamento:</Text>
//             <FlatList
//                 data={orders}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderItem}
//             />
//         </View>
//     );
// }
