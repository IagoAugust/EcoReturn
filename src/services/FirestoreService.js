import React from "react";
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from "./FirebaseConfig";

export async function getUserDataFromFirestore(userId){
    try{
        const userDocRef = doc(FIRESTORE_DB, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if(userDocSnap.exists()){
            return userDocSnap.data();
        }else {
            console.error('Documento do usuário não encrontado no Firestore.');
            return null;
        }
    } catch (error){
        console.error('Error ao obter dados do usuário do Firestore:', error.message);
        return null;
    }
}