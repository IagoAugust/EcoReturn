import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { getDocs, collection, updateDoc, doc, onSnapshot } from "firebase/firestore";
import Modal from 'react-native-modal';
import { useAuth } from "../../context/AuthContext";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";

export function Shop() {
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user, updateUser } = useAuth();
    const [purchaseMessage, setPurchaseMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'product'));
                const data = querySnapshot.docs.map(doc => {
                    const { description, imgUrl, name, value } = doc.data();
                    return { id: doc.id, description, imgUrl, name, value };
                });
                setProducts(data);
            } catch (error) {
                console.error('Erro ao buscar dados do Firestore:', error);
            }
        };

        const userDocRef = doc(FIRESTORE_DB, 'users', user.uid);

        // Adiciona um listener para atualizações em tempo real
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                // Atualiza o usuário no contexto de autenticação
                updateUser(userData);
            }
        });

        // Executa a busca inicial dos dados
        fetchData();

        // Retorna a função de limpeza do listener
        return () => unsubscribe();
    }, []);

    const handleBuy = async () => {
        if (user.ecoCoins >= selectedProduct.value) {
            try {
                const newEcoCoins = user.ecoCoins - selectedProduct.value;

                // Atualiza diretamente na coleção de usuários
                const userDocRef = doc(FIRESTORE_DB, 'users', user.uid);
                await updateDoc(userDocRef, { ecoCoins: newEcoCoins });

                setPurchaseMessage('Compra realizada com sucesso!');
                setTimeout(() => {
                    setModalVisible(false);
                    setSelectedProduct(null);
                }, 2000);
            } catch (error) {
                console.error('Erro ao atualizar dados do Firestore:', error);
            }
        } else {
            alert('Valor de Eco Coins insuficiente');
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setPurchaseMessage('');
    };

    return (
        <View>
            <View style={styles.container_titulo}>
                <View style={styles.ecoCoinsContainer}>
                    <Text style={styles.titulo_ecoCoins}>
                        EC$ {user.ecoCoins}
                    </Text>
                </View>
                <Text style={styles.titulo}>
                    Produtos
                </Text>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedProduct(item);
                            setModalVisible(true);
                        }}
                        style={styles.productContainer}
                    >
                        <View>
                            <Image source={{ uri: item.imgUrl }} style={styles.productImage} />
                        </View>
                        <View>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.productValue}> EC$ {item.value}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    handleModalClose();
                }}
                style={styles.modalBackgroud}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedProduct && (
                            <>
                                <Image source={{ uri: selectedProduct.imgUrl }} style={styles.productImage} />
                                <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                                <Text style={styles.productValue}>EC$ {selectedProduct.value}</Text>
                            </>
                        )}

                        <TouchableOpacity
                            onPress={handleBuy}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>Comprar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { setModalVisible(false) }}
                            style={[styles.modalButton, { backgroundColor: 'red' }]}
                        >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <Text>{purchaseMessage}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
