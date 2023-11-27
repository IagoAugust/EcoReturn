import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView  } from "react-native";
import { useAuth } from "../../context/AuthContext";
import Modal from "react-native-modal";
import { styles } from "./styles";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig";

export function Profile() {
  const { user, updateUser,  } = useAuth();
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [passwordInput, setPasswordInput] = useState("");

  const handleUpdate = async () => {
    try {
      await updateUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error.message);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    // Você também pode reiniciar os campos atualizados para os valores originais, se desejar.
    setUpdatedUser({ ...user });
  };

  function HandleLogout(){
    FIREBASE_AUTH.signOut();
    updateRedirectToHome(false);
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Perfil do usuário</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {editing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              value={updatedUser.name}
              onChangeText={(text) => setUpdatedUser({ ...updatedUser, name: text })}
              placeholder="Nome"
            />
            <TextInput
              style={[styles.input, { color: 'gray' }]}
              value={updatedUser.CPF}
              onChangeText={(text) => setUpdatedUser({ ...updatedUser, CPF: text })}
              placeholder="CPF"
              editable={false}
            />
            <TextInput
              style={styles.input}
              value={updatedUser.address}
              onChangeText={(text) => setUpdatedUser({ ...updatedUser, address: text })}
              placeholder="Endereço"
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancelar" onPress={handleCancel} color="red" />
              <Button title="Salvar" onPress={handleUpdate} />
            </View>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.userInfo}>Nome: {user.name}</Text>
            <Text style={styles.userInfo}>Email: {user.email}</Text>
            <Text style={styles.userInfo}>CPF: {user.CPF}</Text>
            <Text style={styles.userInfo}>Endereço: {user.address}</Text>
            <Text style={styles.userInfo}>ecoCoins: {user.ecoCoins}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Sair" onPress={HandleLogout} color={"red"} />
              <Button title="Editar" onPress={() => setEditing(true)} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}