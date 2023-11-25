import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e3e6e8', // ecf0f3
        paddingTop: '5%'
      },

    subTitle: {
        color: '#000',
        // backgroundColor: '#000',
        fontSize: 20,
        marginTop: '2%',
        textAlign: 'center',
        maxWidth: '80%',
        fontWeight: 'bold'
    },
    
    button: {
        marginTop: '15%',
        backgroundColor: "#F4F4F4", //  add185
        borderWidth: 1.5,
        borderColor: "#5a6e3f", // 000    405129
        borderRadius: 16,
        width: 296,
        height: 80,
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 25,
    },
      
    buttonText: {
        fontSize: 20,
        marginLeft: 10,
        color: "#000",
    },

    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 25,
        backgroundColor: "#add185",
        borderWidth: 1.5,
        borderColor: "#000",
        borderRadius: 37.5 ,
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
      },

});