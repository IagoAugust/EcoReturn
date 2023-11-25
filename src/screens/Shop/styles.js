import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    carrossel:{
        // flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor:'red',
        width:'100%',
        height:'45%',
        backgroundColor:'red'
    },
    
    titulo:{
        fontSize:30,
        alignItems:'center',
        // backgroundColor:'red',
        justifyContent: 'center',
    },

    // parte dos produtos

    productContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        objectFit: 'cover',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        fontSize: 16,
        color: '#555',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
})