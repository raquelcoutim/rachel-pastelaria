import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Space = () => <View style={styles.space} />

export default function ResetPass() {

    const [email, setEmail] = useState('');

    const navigation = useNavigation()

    function resetPass() {
        if (email != "") {
            sendPasswordResetEmail(FIREBASE_AUTH, email).then(() => {
                alert("Foi enviado um email para " + email);
                navigation.navigate("Login");
            });

        } else {
            alert("É preciso inserir um email válido para redefinir a senha.");
            return
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{fontFamily: 'MadimiOne', fontSize: 25}}>Redefinir senha</Text>
            <Space/>
            <TextInput
                style={styles.input}
                placeholder="Insira o email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
            />
            <Space />
            <TouchableOpacity style={styles.button} onPress={resetPass}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        height: 40,
        width: 270,
        padding: 10
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
    buttonText: {
        fontFamily: 'MadimiOne',
        color: "#fff",
        fontSize: 22
    },
    space: {
        marginVertical: 20
    },

})