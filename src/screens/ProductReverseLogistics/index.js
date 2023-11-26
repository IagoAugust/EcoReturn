import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { styles } from "./styles";
import { addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";
import { useAuth } from "../../context/AuthContext";

export function ProductReverseLogistics({ route, navigation }) {
    const { user } = useAuth();
    const { storeId, storeName } = route.params;
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [amountProduct, setAmountProduct] = useState(1);
    const [loading, setLoading] = useState(false);

    const createOrder = async (selectedProduct, amountProduct) => {
        try {
            const randomEcoCoins = Math.floor(Math.random() * (150 - 10 + 1)) + 10;

            const orderData = {
                name: ('Pedido do/a ' + selectedProduct?.name),
                productName: selectedProduct?.name,
                imageUrl: selectedProduct?.imageUrl,
                quantity: amountProduct,
                status: "Em Andamento",
                orderDate: serverTimestamp(),
                uidUser: user?.uid,
                ecoCoins: randomEcoCoins,
            };

            const orderRef = await addDoc(collection(FIRESTORE_DB, 'orders'), orderData);
            return orderRef.id;
        } catch (error) {
            console.error('Erro ao criar a ordem no Firestore:', error);
            throw error;
        }
    };

    useEffect(() => {
        const storeNameHeader = storeName || 'Produto';
        navigation.setOptions({ title: storeNameHeader });

        const fetchProducts = async () => {
            try {
                if (user) {
                    const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'storeReverseLogistics', storeId, 'products'));
                    const data = querySnapshot.docs.map(doc => {
                        const { name, imageUrl, category } = doc.data();
                        return { id: doc.id, name, imageUrl, category };
                    });
                    setProducts(data);
                }
            } catch (error) {
                console.error('Erro ao buscar produtos no Firestore:', error);
            }
        };

        fetchProducts();
    }, [user, storeId, storeName, navigation]);

    const SendingOrderForCreate = async () => {
        setLoading(true);
        try {
            await createOrder(selectedProduct, amountProduct);
            Alert.alert('Sucesso', 'Sucesso ao criar o pedido. \nRedirecionando para a tela pedidos');
            navigation.navigate("Orders");
        } catch (error) {
            Alert.alert("Erro ao enviar o pedido", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.description}>Escolha um produto da {storeName} para realizar a logística</Text>
            <FlatList
                style={styles.productListContainer}
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                            setSelectedProduct(item);
                            setModalVisible(true);
                        }}
                    >
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        </View>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productCategory}>{item.category}</Text>
                    </TouchableOpacity>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.gridContainer}>
                        <Text style={styles.gridDescription}>Solicite a logística reversa enviando seu pedido para análise</Text>
                        <Text>{selectedProduct?.name}</Text>
                        <View style={styles.girdImageContainer}>
                            <Image source={{ uri: selectedProduct?.imageUrl }} style={styles.image} />
                        </View>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Quantidade"
                            value={amountProduct.toString()}
                            onChangeText={(text) => setAmountProduct(parseInt(text) || 0)}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.modalButton}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SendingOrderForCreate(selectedProduct, amountProduct)}>
                            <Text style={styles.modalButton}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
