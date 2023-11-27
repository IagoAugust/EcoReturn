import React, {useEffect, useState} from "react";
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity } from "react-native";
import Swiper from 'react-native-swiper';
import { styles } from "./styles";
import { getDocs, collection, Firestore } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/FirebaseConfig";
import Modal from 'react-native-modal';
import { useAuth } from "../../context/AuthContext";
import { updateDoc, doc } from 'firebase/firestore';

// retorna o shop
export function Shop(){

    // estados
    const [products,setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useAuth();
    const [buyStatus, setBuyStatus] = useState('');
    const [userEcoCoins, setUserEcoCoins] = useState(user.ecoCoins);


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
    
        fetchData();
    }, []);

    useEffect(() => {
        setUserEcoCoins(user.ecoCoins);
    }, [user.ecoCoins]);
    
    
    // const handleBuy = (product) => {
    //     // if (user.ecoCoins >= product.value) {
    //     //     // Usuário tem Eco Coins suficientes, realiza a compra
    //     //     const newEcoCoins = user.ecoCoins - product.value;
    
    //     //     try {
    //     //         // Supondo que você tenha uma coleção 'users' no Firestore
    //     //         const userDocRef = doc(FIRESTORE_DB, 'users', user.id);
                
    //     //         // Atualiza o campo 'ecoCoins' do documento do usuário
    //     //          updateDoc(userDocRef, {
    //     //             ecoCoins: newEcoCoins,
    //     //         });
    
    //     //         setUserEcoCoins(newEcoCoins);
    //     //         setBuyStatus('Comprado com sucesso');
    
    //     //         // Limpa a mensagem de status após 3 segundos (ajuste conforme necessário)
    //     //         setTimeout(() => {
    //     //             setBuyStatus('');
    //     //         }, 3000);
    //     //     } catch (error) {
    //     //         console.error('Erro ao atualizar Eco Coins no Firestore:', error);
    //     //     }
    // // } else {
    // //     // Usuário não tem Eco Coins suficientes
    // //     setBuyStatus('Valor de Eco Coins insuficiente');
    // // }
    // };

    // retorna a tela SHOP
    return(
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
                            <Image source={{ uri: item.imgUrl }} style={styles.productImage}/>
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
                    setModalVisible(!modalVisible);
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
                            onPress={() => null}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>Comprar</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity
                                onPress={()=>{setModalVisible(false)}}
                                style={[styles.modalButton, { backgroundColor: 'red' }]}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <Text>{buyStatus}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}