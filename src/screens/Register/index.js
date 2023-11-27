import React, {useState} from "react";
import { styles } from "./styles";
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDocs, where, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../services/FirebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { isEmpty } from "lodash";

export function Register({ route, navigation }){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [name, setName] = useState();
    const [cpf, setCpf] = useState();
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
            }else if (!validateCPF(cpf)) {
                Alert.alert('CPF Inválido', 'Por favor, insira um CPF válido.');
            }else{

                const cpfQuery = await getDocs(collection(FIRESTORE_DB, "users"), where("CPF", "==", cpf));
                if (!isEmpty(cpfQuery.docs)) {
                    Alert.alert('CPF já cadastrado', 'Já existe um usuário cadastrado com esse CPF.');
                    return;
                }
                const response = await createUserWithEmailAndPassword(auth,email,password);
                    try {
                        await setDoc(doc(FIRESTORE_DB, "users", response.user.uid ), {
                            name: name,
                            email: email,
                            ecoCoins: 0,
                            CPF: cpf,
                            endereco: null,
                            uid: response.user.uid
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

    function validateCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11) {
            return false;
        }
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let digit1 = 11 - (sum % 11);
        digit1 = digit1 > 9 ? 0 : digit1;
    
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let digit2 = 11 - (sum % 11);
        digit2 = digit2 > 9 ? 0 : digit2;
    
        if (parseInt(cpf.charAt(9)) !== digit1 || parseInt(cpf.charAt(10)) !== digit2) {
            return false;
        }
    
        return true;
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
                style={styles.input}
                placeholder="CPF"
                keyboardType="numeric"
                placeholderTextColor="black"
                value={cpf}
                onChangeText={(text) => {
                    setCpf(text);
                }}
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
