import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
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
        marginLeft: 8,
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
    completed: {
        color: 'green',
    },
});