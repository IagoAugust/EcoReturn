import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e3e6e8',
        paddingTop: '5%',
    },

    description: {
        fontSize: 20,
        marginBottom: 20,
        marginBottom: 35,
        maxWidth: '90%',
    },

    productListContainer: {
        width: '100%',
    },

    card: {
        marginBottom: 20,
        alignItems: 'center',
    },

    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 25,
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        resizeMode: 'cover',
    },

    productName: {
        textAlign: 'center',
        fontSize: 16,
    },

    productCategory: {
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
    },

    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.36)',
        width: '100%', 
        height: '100%',
    },

    gridContainer: {
        width: '85%',
        height: 550,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingBottom: 45,
    },

    gridDescription: {
        fontSize: 18,
        marginBottom: 35,
        maxWidth: '90%',
    },

    girdImageContainer: {
        width: 150,
        height: 150,
        borderRadius: 25,
        overflow: 'hidden',
        margintop: 20,
        marginBottom: 50
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        maxWidth: '18%',
        textAlign:'center'
    },
    
    modalButton: {
        color: 'blue',
        fontSize: 16,
        marginTop: 10,
    },
    
});