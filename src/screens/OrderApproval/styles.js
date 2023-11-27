import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        margin: 20,
    },
    orderContainer: {
        flexDirection: "row",
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 8,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 8,
        borderRadius: 8,
        alignSelf: 'center',
        borderRadius: 25
    },
    orderDetails: {
        flex: 1,
        paddingHorizontal: 4,
        marginLeft: 10,
        marginBottom: 10
    },
    containerText: {
        flexDirection: "column",
        textAlign: 'center',
        flexShrink: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    input: {
        fontSize: 16,
        marginLeft: 5,
    },
    productName: {
        flexShrink: 1, // Permite que o nome do produto encolha
    },
    status: {
        flexDirection: 'row',
        textAlign: 'center'
    },
    inProgress: {
        color: 'blue',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginTop: 25, 
    },
    button: {
        flex: 1,
        maxWidth: 120, 
        height: 35,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, 
    },
    completeButton: {
        marginLeft: '-15%',
        borderColor: 'green',
        // backgroundColor: 'green',
    },
    cancelButton: {
        marginRight: '15%',
        borderColor: 'red',
        // backgroundColor: 'red', 
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});