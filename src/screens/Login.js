import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth"

const Space = () => <View style={styles.space} />

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const navigation = useNavigation();

    function signIn() {
        signInWithEmailAndPassword(auth, email, password).
            then((userCredencial) => {
                const user = userCredencial.user;
                navigation.navigate('MyTab', { screen: 'Home' });
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'MyTab',
                        state: {
                            routes: [
                                {
                                    name: 'Home'
                                }
                            ]
                        }
                    }]
                });
                alert("Login efetuado.");

            }).
            catch((error) => {
                alert("Ops! " + error.message + " Tente novamente mais tarde.")
            })

    }


    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <KeyboardAvoidingView behavior="padding">
                    <Text style={styles.title}>Email</Text>
                    <TextInput placeholder="Digite seu email" style={styles.input} value={email} autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
                    <Space />
                    <Text style={styles.title}>Senha</Text>
                    <TextInput placeholder="Digite sua senha" style={styles.input} secureTextEntry={true} value={password} autoCapitalize="none" onChangeText={(text) => setPassword(text)} />
                    <Space />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('RedefinirSenha');
                    }}>
                        <Text style={{ fontFamily: 'MadimiOne', fontSize: 25 }}>Esqueci a senha</Text>
                    </TouchableOpacity>
                    <Space />
                    <TouchableOpacity style={styles.button} onPress={signIn}>
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                    <Space />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('Cadastro')
                    }}>
                        <Text style={styles.buttonText}>Cadastre-se!</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 50,
        width: 270,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f04c24',
        color: '#fff',
        borderRadius: 5,
    },
    space: {
        marginVertical: 20
    },
    title: {
        fontFamily: 'MadimiOne',
        fontSize: 25,

    },
    buttonText: {
        fontFamily: 'MadimiOne',
        color: "#fff",
        fontSize: 22
    },
    input: {
        borderWidth: 1,
        height: 40,
        padding: 10
    }
})