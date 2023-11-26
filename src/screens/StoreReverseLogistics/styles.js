import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e3e6e8',
        paddingTop: '5%'
    },
    description: {
        fontSize: 15,
        marginBottom: 25,
    },
    containerCard: {
        width: '80%',
        maxHeight: '90%', 
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
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        resizeMode: 'cover',
    },
    titleStore: {
        textAlign: 'center',
        fontSize: 16, 
    },
});
    