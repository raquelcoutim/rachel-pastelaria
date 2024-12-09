import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal, FlatList } from "react-native";
import { useEffect } from "react";
import { db, FIREBASE_AUTH } from "../../FirebaseConfig";
import { ref, set, update } from 'firebase/database';
import firebase from 'firebase/app';
import { useFonts } from "expo-font";
import { useState } from "react";
import { globalUsername } from "./ShoppingCart";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Home() {

    const availableProducts = [
        { id: '1', name: 'Suco de laranja', price: 5.0 },
        { id: '2', name: 'Coca-cola', price: 5.0 },
        { id: '3', name: 'Pastel de carne', price: 7.0 },
        { id: '4', name: 'Pastel de frango', price: 7.0 },
        { id: '5', name: 'Pizza de carne', price: 10.0 },
        { id: '6', name: 'Pizza de frango', price: 10.0 },
    ];

    const user = FIREBASE_AUTH.currentUser.email.split('@')[0];

    const addCart = (name, id, qtd, price, img) => {
        set(ref(db, 'Clientes/' + user + '/' + id + '/'), {
            name: name,
            id: id,
            qtd: qtd,
            price: (price * qtd),
            img: img
        }).then(() => {
            alert("Produto Cadastrado!");
        }).catch((error) => {
            console.log(error);
            alert('Produto Não Cadastrado!');
        })
    };

    const totalItems = availableProducts.length;
    const totalPrice = availableProducts.reduce((sum, item) => sum + item.price, 0);

    const [isModalBebidasVisible, setIsModalBebidasVisible] = useState(false);
    const [isModalPastelVisible, setIsModalPastelVisible] = useState(false);
    const [isModalPizzaVisible, setIsModalPizzaVisible] = useState(false);
    const [qtdCoca, setQtdCoca] = useState(0);
    const [qtdSuco, setQtdSuco] = useState(0);
    const [qtdPastelCarne, setQtdPastelCarne] = useState(0);
    const [qtdPastelFrango, setQtdPastelFrango] = useState(0);
    const [qtdPizzaCarne, setQtdPizzaCarne] = useState(0);
    const [qtdPizzaFrango, setQtdPizzaFrango] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.pesquisa}>
                <TextInput
                    style={styles.barraPesq}
                    placeholder="Não funciona ainda."
                />
                <TouchableOpacity style={styles.iconButton}>
                    <Image
                        style={styles.icon}
                        source={require('../images/user.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.contButton}>
                <TouchableOpacity style={styles.button} onPress={() => {setIsModalBebidasVisible(true), setQtdCoca(0), setQtdSuco(0)}}>
                    <Image
                        source={require('../images/drink-cap.png')}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {setIsModalPastelVisible(true), setQtdPastelCarne(0), setQtdPastelFrango(0)}}>
                    <Image
                        source={require('../images/pastel.png')}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth: 5, borderColor: "black", borderRadius: 10, padding: 5 }} onPress={() => {setIsModalPizzaVisible(true), setQtdPizzaCarne(0), setQtdPizzaFrango(0)}}>
                    <Image
                        source={require('../images/pizza.png')}
                        style={styles.img}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.header}>Clique nos botões acima para ter acesso ao cardápio.</Text>
                <Modal visible={isModalBebidasVisible} onRequestClose={() => setIsModalBebidasVisible(false)} animationType="slide" transparent={true} style={styles.modalCont}>
                    <View style={styles.modal}>
                        <View style={styles.modalTitle}>
                            <Text>Bebidas disponíveis</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <View style={styles.productButton}>
                                <Image
                                    source={require('../images/coca.jpg')}
                                    resizeMethod="resize" style={styles.imageProduct} />
                                <View>
                                    <Text>Coca-cola.</Text>
                                    <Text>3,00 R$.</Text>
                                    <View style={styles.qtdButtons}>
                                        <TouchableOpacity onPress={() => {
                                            setQtdCoca(qtdCoca + 1);
                                        }}>
                                            <FontAwesome name="plus-circle" size={24} color="black" style={{ marginRight: 5 }} />
                                        </TouchableOpacity>
                                        <Text>{qtdCoca}</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (qtdCoca > 0) {
                                                setQtdCoca(qtdCoca - 1);
                                            } else {
                                                setQtdCoca(0)
                                            }

                                        }}>
                                            <FontAwesome name="minus-circle" size={24} color="black" style={{ marginLeft: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.buttonCart} onPress={() => {
                                        addCart("Coca-cola", 2, qtdCoca, 3.0, require('../images/coca.jpg'))
                                    }}>
                                        <Text>Adicionar ao carrinho.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.productButton}>
                                <Image
                                    source={require('../images/suco.jpeg')}
                                    resizeMethod="resize" style={styles.imageProduct} />
                                <View>
                                    <Text>Suco de laranja.</Text>
                                    <Text>3,00 R$.</Text>
                                    <View style={styles.qtdButtons}>
                                        <TouchableOpacity onPress={() => {
                                            setQtdSuco(qtdSuco + 1);
                                        }}>
                                            <FontAwesome name="plus-circle" size={24} color="black" style={{ marginRight: 5 }} />
                                        </TouchableOpacity>
                                        <Text>{qtdSuco}</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (qtdSuco > 0) {
                                                setQtdSuco(qtdSuco - 1);
                                            } else {
                                                setQtdSuco(0)
                                            }

                                        }}>
                                            <FontAwesome name="minus-circle" size={24} color="black" style={{ marginLeft: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.buttonCart} onPress={() => {
                                        addCart("Suco de laranja", 1, qtdSuco, 3.0, '../images/suco.jpeg')
                                    }}>
                                        <Text>Adicionar ao carrinho.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal visible={isModalPastelVisible} onRequestClose={() => setIsModalPastelVisible(false)} animationType="slide" transparent={true} style={styles.modalCont}>
                    <View style={styles.modal}>
                        <View style={styles.modalTitle}>
                            <Text>Pastéis disponíveis</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <View style={styles.productButton}>
                                <Image
                                    source={require('../images/pastel-carne.jpeg')}
                                    resizeMethod="resize" style={styles.imageProduct} />
                                <View>
                                    <Text>Pastel de carne.</Text>
                                    <Text>7,00 R$.</Text>
                                    <View style={styles.qtdButtons}>
                                        <TouchableOpacity onPress={() => {
                                            setQtdPastelCarne(qtdPastelCarne + 1);
                                        }}>
                                            <FontAwesome name="plus-circle" size={24} color="black" style={{ marginRight: 5 }} />
                                        </TouchableOpacity>
                                        <Text>{qtdPastelCarne}</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (qtdPastelCarne > 0) {
                                                setQtdPastelCarne(qtdPastelCarne - 1);
                                            } else {
                                                setQtdPastelCarne(0)
                                            }

                                        }}>
                                            <FontAwesome name="minus-circle" size={24} color="black" style={{ marginLeft: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.buttonCart} onPress={() => {
                                        addCart("Pastel de carne", 3, qtdPastelCarne, 7.0, '../images/pastel-carne.jpeg')
                                    }}>
                                        <Text>Adicionar ao carrinho.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.productButton}>
                                <Image
                                    source={require('../images/pastel-frango.jpg')}
                                    resizeMethod="resize" style={styles.imageProduct} />
                                <View>
                                    <Text>Pastel de frango.</Text>
                                    <Text>7,00 R$.</Text>
                                    <View style={styles.qtdButtons}>
                                        <TouchableOpacity onPress={() => {
                                            setQtdPastelFrango(qtdPastelFrango + 1);
                                        }}>
                                            <FontAwesome name="plus-circle" size={24} color="black" style={{ marginRight: 5 }} />
                                        </TouchableOpacity>
                                        <Text>{qtdPastelFrango}</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (qtdPastelFrango > 0) {
                                                setQtdPastelFrango(qtdPastelFrango - 1);
                                            } else {
                                                setQtdPastelFrango(0)
                                            }

                                        }}>
                                            <FontAwesome name="minus-circle" size={24} color="black" style={{ marginLeft: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.buttonCart} onPress={() => {
                                        addCart("Pastel de frango", 4, qtdPastelFrango, 7.0, '../images/pastel-frango.jpg')
                                    }}>
                                        <Text>Adicionar ao carrinho.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal visible={isModalPizzaVisible} onRequestClose={() => setIsModalPizzaVisible(false)} animationType="slide" transparent={true} style={styles.modalCont}>
                    <View style={styles.modal}>
                        <View style={styles.modalTitle}>
                            <Text>Pizzas disponíveis</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <View style={styles.productButton}>
                                <View>
                                    <Image
                                        source={require('../images/pizza-carne.jpeg')}
                                        resizeMethod="resize" style={styles.imageProduct} />
                                </View>
                                <View>
                                    <Text>Pizza de carne.</Text>
                                    <Text>10,00 R$.</Text>
                                    <View style={styles.qtdButtons}>
                                        <TouchableOpacity onPress={() => {
                                            setQtdPizzaCarne(qtdPizzaCarne + 1);
                                        }}>
                                            <FontAwesome name="plus-circle" size={24} color="black" style={{ marginRight: 5 }} />
                                        </TouchableOpacity>
                                        <Text>{qtdPizzaCarne}</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (qtdPizzaCarne > 0) {
                                                setQtdPizzaCarne(qtdPizzaCarne - 1);
                                            } else {
                                                setQtdPizzaCarne(0)
                                            }

                                        }}>
                                            <FontAwesome name="minus-circle" size={24} color="black" style={{ marginLeft: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.buttonCart} onPress={() => {
                                        addCart("Pizza de carne", 5, qtdPizzaCarne, 10.0, '../images/pizza-carne.jpeg')
                                    }}>
                                        <Text>Adicionar ao carrinho.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.productButton}>
                                <Image
                                    source={require('../images/pizza-frango.jpg')}
                                    resizeMethod="resize" style={styles.imageProduct} />
                                <View>
                                    <Text>Pizza de frango.</Text>
                                    <Text>10,00 R$.</Text>
                                    <View style={styles.qtdButtons}>
                                        <TouchableOpacity onPress={() => {
                                            setQtdPizzaFrango(qtdPizzaFrango + 1);
                                        }}>
                                            <FontAwesome name="plus-circle" size={24} color="black" style={{ marginRight: 5 }} />
                                        </TouchableOpacity>
                                        <Text>{qtdPizzaFrango}</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (qtdPizzaFrango > 0) {
                                                setQtdPizzaFrango(qtdPizzaFrango - 1);
                                            } else {
                                                setQtdPizzaFrango(0)
                                            }

                                        }}>
                                            <FontAwesome name="minus-circle" size={24} color="black" style={{ marginLeft: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.buttonCart} onPress={() => {
                                        addCart("Pizza de frango", 6, qtdPizzaFrango, 10.0, '../images/pizza-frango.jpg')
                                    }}>
                                        <Text>Adicionar ao carrinho.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    content: {
        flex: 2,

    },
    img: {
        width: 50,
        height: 50,
    },
    button: {
        borderWidth: 5,
        borderColor: "black",
        borderRadius: 10,
        marginRight: 25,
        padding: 5
    },
    contButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    buttonCart: {
        width: 170,
        height: 50,
        color: '#fff',
        backgroundColor: "#f04c24",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10

    },
    pesquisa: {
        padding: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    barraPesq: {
        width: 270,
        height: 50,
        backgroundColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 25,
        marginRight: 15
    },
    icon: {
        width: 30,
        height: 30,
    },
    iconButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        padding: 5,
        borderWidth: 2,
        borderRadius: 60

    },
    modalCont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        width: 370,
        height: 680,
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignSelf: 'center'
    },
    modalTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    modalContent: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        flexDirection: 'column',

    },
    productButton: {
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
    imageProduct: {
        width: 100,
        height: 100,
        marginBottom: 10,
        marginRight: 55
    },
    qtdButtons: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    }
})