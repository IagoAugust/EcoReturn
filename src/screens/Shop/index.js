import React from "react";
import { Text, View, ScrollView, FlatList, Image } from "react-native";
import Swiper from 'react-native-swiper';
import { styles } from "./styles";

const products = [
    {
      id: '1',
      name: 'Lata de Coca-cola',
      description: 'Descrição do Produto 1',
      image: 'https://www.imigrantesbebidas.com.br/img/bebida/images/products/full/1984-refrigerante-coca-cola-lata-350ml.jpg?fm=webp&s=933deefcdcfcb4b1484ca4912f212c5a',
      price: 'EC 20',
    },
    {
      id: '2',
      name: 'Garrafa Pet',
      description: 'Descrição do Produto 2',
      image: 'https://www.sbel.org.br/image/cache/catalog/produtos/Bebidas/PRD00094-Refrigerante%20Coca%20Cola%20-%20Garrafa%20Pet%202L-1000x1000.jpg',
      price: 'EC 50',
    }
  ];

// constroi a lista de produtos
const renderProductItem = ({ item }) => (
    
    <ScrollView>
        <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </View>
    </View>
    </ScrollView>
);

// const ecoCoins = ({poins}) =>{

//     <View>
//         <Text>
//             Ola
//         </Text>
//     </View>
// }

// retorna o shop
export function Shop(){
    return(
        <>
            <Text style={styles.titulo}> 
                Produtos
            </Text>
            <FlatList data={products} keyExtractor={(item) => item.id} renderItem={renderProductItem}/>
        </>
    );
}