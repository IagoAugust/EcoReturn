import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { collection, query, where, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./styles";

export function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsQuery = query(
          collection(FIRESTORE_DB, 'notifications'),
          where('uidUser', '==', user.uid)
        );

        const querySnapshot = await getDocs(notificationsQuery);
        const notificationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      // Cria a referência correta para o documento
      const notificationDocRef = doc(FIRESTORE_DB, 'notifications', notificationId);

      // Atualiza o documento no Firestore para marcar como lido
      await updateDoc(notificationDocRef, {
        read: true,
      });

      // Atualiza o estado local para refletir a mudança
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications.filter((item) => !item.read)} // Filtra as notificações não lidas
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>
              Produto: {item.productName}, a ordem foi {item.statusOrder}.
              {item.statusOrder === 'completed' && (
                <Text> Valor do EcoCoins recebido: {item.ecoCoins} EcoCoins. </Text>
              )}
            </Text>
            <Text>Data da Aprovação: {item.createdAt.toDate().toLocaleDateString()}</Text>
            {/* Adicione um botão para marcar como lido */}
            {!item.read && (
              <TouchableOpacity onPress={() => markAsRead(item.id)}>
                <Text style={{ color: 'blue' }}>Marcar como lido</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}
