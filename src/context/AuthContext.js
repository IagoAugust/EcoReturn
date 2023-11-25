import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { FIREBASE_AUTH } from "../services/FirebaseConfig";
import { getUserDataFromFirestore } from "../services/FirestoreService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [register, setRegister ] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const userData = await getUserDataFromFirestore(user.uid);
        setUser(userData);
        if (!register){
          updateRedirectToHome(true);
        }else{
          updateRedirectToHome(false);
        };
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

  return (
    <AuthContext.Provider value={{ user, storeUserDataLocally, redirectToHome, updateRedirectToHome, updateregister }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('UseAuth deve ser utilizado dentro de um AuthProvider');
  }

  return context;
}