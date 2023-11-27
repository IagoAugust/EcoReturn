import { FIREBASE_AUTH } from "../services/FirebaseConfig";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, deleteUser as deleteFirebaseUser } from "@firebase/auth";
import { getUserDataFromFirestore, deleteUserDataFromFirestore, updateUserDataInFirestore } from "../services/FirestoreService";  // Ajuste o caminho da importação conforme necessário

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [register, setRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (authUser) => {
      if (authUser) {
        const userData = await getUserDataFromFirestore(authUser.uid);
        setUser(userData);
        if (!register) {
          updateRedirectToHome(true);
        } else {
          updateRedirectToHome(false);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const storeUserDataLocally = async (userData) => {
    // Implemente conforme necessário (pode usar AsyncStorage, por exemplo)
  };

  const updateRedirectToHome = (value) => {
    setRedirectToHome(value);
  };

  const updateregister = (value) => {
    setRegister(value);
  };

  const updateUser = async (updatedUserData) => {
    try {
      // Atualiza os dados do usuário no Firestore
      await updateUserDataInFirestore(user.uid, updatedUserData);
      // Atualiza localmente
      setUser(updatedUserData);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error.message);
      throw error;
    }
  };

  const deleteUser = async () => {
    try {
      // Exclui o usuário no Firebase Auth
      await deleteFirebaseUser(FIREBASE_AUTH.currentUser);
      // Exclui os dados do usuário no Firestore
      await deleteUserDataFromFirestore(user.uid);
      // Limpa dados locais, se necessário
      setUser(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, storeUserDataLocally, redirectToHome, updateRedirectToHome, updateregister, updateUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }

  return context;
}
