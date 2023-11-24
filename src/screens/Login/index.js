import React, {Component, useState} from "react";
import { styles } from "./styles";
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../services/FirebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export function Login(){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();

    const auth = FIREBASE_AUTH;
    const navigation = useNavigation(); 
    
    const singIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth,email, password);

            const userDocRef = doc(FIRESTORE_DB,"users", response.user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists) {
                const userData = userDocSnap.data();

                console.log(userData)
                navigation.navigate("Home", { user: "Iago"})
            } else {
                Alert.alert("Usuário não reconhecido ");
            }

        } catch (error) {
            Alert.alert('Falha no Cadastro', error.message);
        } finally {
            setLoading(false);
        }
    };
      
    function handleRegister(){
        navigation.navigate('Register');
    };
    
    return(
        <View style={styles.container}>
            <Image
                source={require('../../../assets/EcoReturn_Logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>EcoReturn</Text>
            <Text style={styles.subTitle}>Uma Abordagem Inovadora para a Sustentabilidade e Gamificação na Logística Reversa</Text>

            <TextInput
                style= {styles.input}
                placeholder= "Email"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="black"
                value={email}
                onChangeText={ (text) => {
                    setEmail(text);
                } }
            />
            <TextInput
                style= {styles.input}
                placeholder= "Senha"
                autoCapitalize="none"
                placeholderTextColor="black"
                secureTextEntry= {true}
                value={password}
                onChangeText={ (text) => {
                    setPassword(text);
                } }
            />

            { loading ? (
                <ActivityIndicator size='large' color="#486523" /> 
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={singIn}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Cadastra-se</Text>
                    </TouchableOpacity>
                </>
      )}

        </View>
    );
}
