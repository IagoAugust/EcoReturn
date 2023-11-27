import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  runTransaction,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";
import { styles } from "./styles";

export function OrderApproval() {
  const [orders, setOrders] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const triggerUpdate = () => {
    setUpdateTrigger((prev) => !prev);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersQuery = query(
          collection(FIRESTORE_DB, 'orders'),
          where('status', '==', 'Em Andamento')
        );

        const querySnapshot = await getDocs(ordersQuery);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error('Erro ao buscar ordens no Firestore:', error);
      }
    };

    fetchOrders();
  }, [updateTrigger]);

  const approveOrder = async (orderId, userId, ecoCoinsToAdd, productName) => {
    const orderDocRef = doc(FIRESTORE_DB, 'orders', orderId);
    const userDocRef = doc(FIRESTORE_DB, 'users', userId);

    const userTransaction = async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      const updatedEcoCoins = userDoc.data().ecoCoins + ecoCoinsToAdd;

      transaction.update(userDocRef, { ecoCoins: updatedEcoCoins });
    };

    try {
      await runTransaction(FIRESTORE_DB, userTransaction);
      await updateDoc(orderDocRef, { status: 'completed' });
      triggerUpdate();
      await addDoc(collection(FIRESTORE_DB, 'notifications'), {
        statusOrder: 'completed',
        productName,
        ecoCoins: ecoCoinsToAdd,
        createdAt: serverTimestamp(),
        read: false,
        uidUser: userId,
      });
      Alert.alert('Sucesso', 'O Pedido foi aprovado com sucesso');
    } catch (error) {
      console.log('Erro ao aprovar o pedido:', error.message);
      throw error;
    }
  };

  const cancelOrder = async (orderId, userId, productName) => {
    const orderDocRef = doc(FIRESTORE_DB, 'orders', orderId);

    try {
      await updateDoc(orderDocRef, { status: 'cancelled' });
      triggerUpdate(); 
      await addDoc(collection(FIRESTORE_DB, 'notifications'), {
        statusOrder: 'cancelled',
        productName,
        createdAt: serverTimestamp(),
        read: false,
        uidUser: userId,
      });
      Alert.alert('Sucesso', 'O Pedido foi reprovado com sucesso');
    } catch (error) {
      console.error('Erro ao cancelar o pedido:', error.message);
      throw error;
    }
  };

  const handleCompleteOrder = async (orderId, userId, ecoCoinsToAdd, productName) => {
    try {
      await approveOrder(orderId, userId, ecoCoinsToAdd, productName);
    } catch (error) {
      console.error('Erro ao concluir o pedido:', error.message);
    }
  };

  const handleCancelOrder = async (orderId, userId, productName) => {
    try {
      await cancelOrder(orderId, userId, productName);
    } catch (error) {
      console.error('Erro ao cancelar o pedido:', error.message);
    }
  };

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
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.completeButton]}
                  onPress={() => handleCompleteOrder(item.id, item.uidUser, item.ecoCoins, item.productName)}
                >
                  <Text style={styles.buttonText}>Concluir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => handleCancelOrder(item.id, item.uidUser, item.productName)}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
