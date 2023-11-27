import { getFirestore, doc, updateDoc, deleteDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from "./FirebaseConfig";

export const getUserDataFromFirestore = async (userId) => {
  const userDocRef = doc(FIRESTORE_DB, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    console.error('Documento do usuário não encontrado no Firestore.');
    return null;
  }
};

export const updateUserDataInFirestore = async (userId, updatedUserData) => {
  const userDocRef = doc(FIRESTORE_DB, 'users', userId);

  try {
    await updateDoc(userDocRef, updatedUserData);
    console.log("Dados do usuário atualizados com sucesso no Firestore");
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário no Firestore:", error.message);
    throw error;
  }
};

export const deleteUserDataFromFirestore = async (userId) => {
  const userDocRef = doc(FIRESTORE_DB, 'users', userId);

  try {
    await deleteDoc(userDocRef);
    console.log("Dados do usuário excluídos com sucesso no Firestore");
  } catch (error) {
    console.error("Erro ao excluir dados do usuário no Firestore:", error.message);
    throw error;
  }
};