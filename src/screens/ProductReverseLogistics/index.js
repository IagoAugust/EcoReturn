import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { styles } from "./styles";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";

export function ProductReverseLogistics({ route, navigation }) {
    const { storeId, storeName } = route.params;
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [amountProduct, setAmountProduct] = useState(1); // Inicializa com 1 como padrão

    useEffect(() => {
        const storeNameHeader = storeName || 'Produto';
        navigation.setOptions({ title: storeNameHeader });
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'storeReverseLogistics', storeId, 'products'));
                const data = querySnapshot.docs.map(doc => {
                    const { name, imageUrl, category } = doc.data();
                    return { id: doc.id, name, imageUrl, category };
                });
                setProducts(data);
            } catch (error) {
                console.error('Erro ao buscar produtos no Firestore:', error);
            }
        };

        fetchProducts();
    }, [storeId, storeName]);

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
                    <Text style={styles.gridDescription}>Informe a quantidade e envie para realizar pedido</Text>
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
                    <TouchableOpacity onPress={() => null}>
                        <Text style={styles.modalButton}>Enviar</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
    );
}
