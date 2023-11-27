import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";

export function Profile() {
  const { user, updateUser, deleteUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleUpdate = async () => {
    try {
      await updateUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error.message);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Usuário",
      "Tem certeza que deseja excluir sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            deleteUser();
            // Lógica adicional após a exclusão, como redirecionar para a tela de login.
          },
        },
      ]
    );
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
    </View>
  );
}