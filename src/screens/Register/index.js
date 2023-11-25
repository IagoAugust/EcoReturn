import React, {useState} from "react";
import { styles } from "./styles";
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../services/FirebaseConfig';
import { useAuth } from '../../context/AuthContext';

export function Register({ route, navigation }){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [name, setName] = useState();
    const [loading, setLoading] = useState();

    const {storeUserDataLocally, updateRedirectToHome, updateregister } = useAuth();
    const auth = FIREBASE_AUTH;
    
    const singUp = async () => {
        setLoading(true);
        try {
          
            if(name == undefined || name == '' || name == ' '){
                Alert.alert('Nome Incorreto', 'Por favor, insira um nome válido.');
            } else if ( password !== passwordConfirm || password == undefined ){
                Alert.alert('Senha Incorreta', 'As senhas não coincidem ou são inválidas.');
            }else{
                const response = await createUserWithEmailAndPassword(auth,email,password);
                    try {
                        await setDoc(doc(FIRESTORE_DB, "users", response.user.uid ), {
                            name: name,
                            email: email,
                            ecocoins: 0,
                            CPF: null,
                            endereco: null 
                        });    
                        
                        await storeUserDataLocally({ name, email, uid: response.user.uid });
                        updateregister(false);
                        updateRedirectToHome(false);
                        Alert.alert(
                            'Cadastro Realizado com Sucesso',
                            'Agora realize o login.'
                          );
                        navigation.navigate('Login');
                    } catch (error) {
                        Alert.alert('Falha ao cadastra no banco', error.message);
                    }
            }
        } catch (error) {
          Alert.alert('Falha no Cadastro', error.message);
        } finally {
          setLoading(false);
        }
      };
        
    function handleLogin(){
        navigation.navigate('Login');
    }
    
    return(
        <View style={styles.container}>
            <Image
                source={require('../../../assets/EcoReturn_Logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Crie sua nova conta</Text>
        
            <TextInput
                style= {styles.input}
                placeholder= "Nome"
                autoCapitalize="none"
                placeholderTextColor="black"
                value={name}
                onChangeText={ (text) => {
                    setName(text);
                } }
            />

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

            <TextInput
                style= {styles.input}
                placeholder= "Confirme a senha"
                autoCapitalize="none"
                placeholderTextColor="black"
                secureTextEntry= {true}
                value={passwordConfirm}
                onChangeText={ (text) => {
                    setPasswordConfirm(text);
                } }
            />


            { loading ? (
                <ActivityIndicator size='large' color="#486523" /> 
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={singUp}>
                        <Text style={styles.buttonText}>Cadastre-se</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Voltar para o Login</Text>
                    </TouchableOpacity>
                </>
      )}

        </View>
    );
}
