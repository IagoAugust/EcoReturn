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
        textDecorationLine: 'underline',
        marginTop:40,
    },

    container_titulo:{
        alignItems:'center',
        marginTop:40,
        marginBottom:20
    },


    // texto ecoCoins
    ecoCoinsContainer: {
        borderWidth: 1,  // Adicione esta linha para definir a largura da borda
        borderColor: 'black',  // Adicione esta linha para definir a cor da borda
        padding: 10,  // Adicione esta linha para adicionar algum espaço interno
    },

    titulo_ecoCoins: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'green',
    },

    ////////////////////////
    // parte dos produtos //
    ////////////////////////
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
    productValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    

    // modal

    // modalBackgroud:{
    //     backgroundColor: 'red',
    //     width:'100%',
    //     height:'100%'
    // },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContent: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    modalImage: {
        width: 200,
        height: 200,
    },
    modalProductName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    modalProductValue: {
        fontSize: 16,
        marginTop: 5,
    },
    modalButton: {
        backgroundColor: 'green',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalCancelButton: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})