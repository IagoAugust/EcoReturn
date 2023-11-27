import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import Modal from "react-native-modal";

export function Profile() {
  const { user, updateUser, deleteUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [isModalVisible, setModalVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const handleUpdate = async () => {
    try {
      await updateUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error.message);
    }
  };

  const handleDelete = () => {
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(passwordInput);
      setModalVisible(false);
      // Lógica adicional após a exclusão, como redirecionar para a tela de login.
    } catch (error) {
      console.error("Erro ao excluir conta:", error.message);
      // Lógica adicional em caso de falha.
    } finally {
      setPasswordInput("");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setPasswordInput("");
  };

  return (
    <View>
      <Text>Perfil do usuário {user.name}</Text>
      {editing ? (
        <View>
          <TextInput
            value={updatedUser.name}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser, name: text })}
            placeholder="Nome"
          />
          {/* Adicione outros campos de input para os dados do usuário */}
          <Button title="Salvar" onPress={handleUpdate} />
        </View>
      ) : (
        <View>
          <Text>Email: {user.email}</Text>
          <Text>ecoCoins: {user.ecoCoins}</Text>
          {/* Exiba outros dados do usuário aqui */}
          <Button title="Editar" onPress={() => setEditing(true)} />
          <Button title="Excluir Conta" onPress={handleDelete} />
        </View>
      )}

      <Modal isVisible={isModalVisible}>
        <View>
          <Text>Digite sua senha para confirmar:</Text>
          <TextInput
            secureTextEntry
            value={passwordInput}
            onChangeText={(text) => setPasswordInput(text)}
            placeholder="Senha"
          />
          <Button title="Cancelar" onPress={closeModal} />
          <Button title="Excluir Conta" onPress={confirmDelete} />
        </View>
      </Modal>
    </View>
  );
}
