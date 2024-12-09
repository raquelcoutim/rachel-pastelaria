import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { db } from "../../FirebaseConfig";
import firebase from "firebase/compat/app";
import { child, onValue, ref, set, update, get, getDatabase, DataSnapshot, remove } from 'firebase/database';
import { useContext } from "react";
import { availableProducts } from "./ShoppingCart";
import { View, Text, StyleSheet, Image, FlatList, Modal, RefreshControl, Touchable } from "react-native";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { TouchableOpacity } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import { QrCodePix } from 'qrcode-pix';


export default function Carrinho() {

    const [array, setArray] = useState([])
    const [data, setData] = useState([])
    const [isModalQrVisible, setModalQrVisible] = useState(false)
    const [isModalQrLeitorVisible, setModalQrLeitorVisible] = useState(false)
    const [nome, setNome] = useState([])
    const [valor, setValor] = useState([])
    const [qtd, setQtd] = useState([])
    const [isRefresh, setIsRefresh] = useState(false) 


    let arrayList = []

    const user = FIREBASE_AUTH.currentUser.email.split('@')[0];

    const totalItems = array.length;
    const totalPrice = array.reduce((sum, item) => sum + item.price, 0);
    const dbRef = ref(db, 'Clientes/' + user);
    const img = '../images/pizza-frango.jpg'

    const qrCodePix = QrCodePix({
        version: '01',
        key: '61061055370', //or any PIX key
        name: 'Raquel Coutim da Silva',
        city: 'Açailândia',
        transactionId: '077', //max 25 characters
        message: 'Obrigada pela preferência! :)',
        cep: '65930000',
        value: totalPrice,
    });

    const getItems = () => {
        setIsRefresh(true)
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((child) => {
                arrayList.push({
                    key: child.val().id,
                    name: child.val().name,
                    price: child.val().price,
                    qtd: child.val().qtd,
                    img: child.val().img
                })
            })
            setArray(arrayList)
        })
    }

    useEffect(() => {

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((child) => {
                arrayList.push({
                    key: child.val().id,
                    name: child.val().name,
                    price: child.val().price,
                    qtd: child.val().qtd,
                    img: child.val().img
                })
            })
            setArray(arrayList)
        })
    }, [])

    useEffect(() => {
        setIsRefresh(false)
    }, [array])

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.QRbutton} onPress={() => setModalQrVisible(true)}>
                        <Text style={{ color: '#fff' }}>Gerar QRCode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.QRbutton} onPress={() => { setModalQrLeitorVisible(true) }}>
                        <Text>LER QRCode</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ alignSelf: 'center', justifyContent: 'center', marginBottom: 20 }}>O preço total é de: {totalPrice} R$.</Text>
                <FlatList
                    style={{ marginBottom: 50 }}
                    data={array}
                    keyExtractor={(item) => item.key}
                    refreshControl={
                        <RefreshControl refreshing={isRefresh} onRefresh={getItems} />
                    }
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.productItem}>
                                <View>
                                    <Text>Name: {item.name}</Text>
                                    <Text>Price: {item.price}</Text>
                                    <Text>Qtd: {item.qtd}</Text>
                                    <TouchableOpacity style={styles.removeButton} onPress={() => {
                                        if (item.qtd > 1) {
                                            update(ref(db, 'Clientes/' + user + '/' + item.key + '/'), {
                                                name: item.name,
                                                id: item.key,
                                                qtd: item.qtd - 1,
                                                price: item.price - (item.price / item.qtd),
                                                img: item.img
                                            })
                                            onValue(dbRef, (snapshot) => {
                                                snapshot.forEach((child) => {
                                                    arrayList.push({
                                                        key: child.val().id,
                                                        name: child.val().name,
                                                        price: child.val().price,
                                                        qtd: child.val().qtd,
                                                        img: child.val().img
                                                    })
                                                })
                                                setArray(arrayList)
                                            })
                                        } else {
                                            set(ref(db, 'Clientes/' + user + '/' + item.key + '/'), null)
                                            onValue(dbRef, (snapshot) => {
                                                snapshot.forEach((child) => {
                                                    arrayList.push({
                                                        key: child.val().id,
                                                        name: child.val().name,
                                                        price: child.val().price,
                                                        qtd: child.val().qtd,
                                                        img: child.val().img
                                                    })
                                                })
                                                setArray(arrayList)
                                            })
                                        }
                                    }}>
                                        <Text>Remover unidade</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
                <Modal visible={isModalQrVisible} onRequestClose={() => setModalQrVisible(false)} animationType="slide" transparent={true}>
                    <View style={styles.modal}>
                        <QRCode value={qrCodePix.payload()} size={250} />
                        <Text style={{ marginTop: 20 }}>Utilize esse QRcode para pagamento!</Text>
                    </View>
                </Modal>
                <Modal visible={isModalQrLeitorVisible} onRequestClose={() => setModalQrLeitorVisible(false)} animationType="slide" transparent={true}>
                    <View style={styles.modal}>

                    </View>
                </Modal>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 1,
        marginTop: 25,
        marginBottom: 25,
        display: 'flex',
        alignItems: 'row'
    },
    content: {
        flex: 2,
        backgroundColor: '#000'
    },
    emptyCart: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
    },
    productItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 20,
        width: 350,
        height: 150,
        marginLeft: 10,
        marginBottom: 35
    },
    reloadButton: {
        padding: 20,
        display: "flex",
        alignItems: 'center',
    },
    removeButton: {
        padding: 15,
        backgroundColor: "#f04c24",
        borderRadius: 5,
        marginTop: 5
    },
    modal: {
        width: 370,
        height: 680,
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    QRbutton: {
        padding: 15,
        backgroundColor: "#f04c24",
        color: '#fff',
        display: 'flex',
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'center',
        marginRight: 5
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    }
});