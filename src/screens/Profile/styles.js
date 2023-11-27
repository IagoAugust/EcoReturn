import { StyleSheet } from "react-native";

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'space-between',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   editContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   infoContainer: {
//     marginBottom: 20,
//   },
//   userInfo: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   modalContainer: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   buttonContainer: {
    
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     gap: 25
//   },
//   cancelButton: {
//     backgroundColor: 'red',
//     marginRight: 10,
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//   },
// });

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: '100%',
    justifyContent: 'flex-end', // Ajuste para posicionar os botões no final
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  editContainer: {
    marginBottom: 20,
    height: '100%',
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  infoContainer: {
    marginBottom: 20,
    height: '100%',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    gap:10,
    flexDirection: "column-reverse",
    alignContent: 'center',
    marginHorizontal: '25%',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});