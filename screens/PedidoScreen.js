import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Button, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { rt, db, auth } from '../database/firebase'
import PedidoStyles from '../styles/PedidoStyles'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const PedidoScreen = (props) => {

    const [pedido, setPedido] = useState([])
    const [sensor, setSensor] = useState({})
    const [loading, setLoading] = useState(true);
    const pedidoID = (props.route.params.nroPedido).toString()
    const entityRef = db.collection('envios')
    const historicoRef = db.collection('historicos')

    useEffect(() => {
        console.log(loading)
    }, [loading])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);


    useEffect(() => {

        rt.ref('/sensores').on('value', snapshot => {
            const sensores = {
                peso: snapshot.val().peso,
                temperatura: snapshot.val().temperatura,
            }
            setSensor(sensores)
        })

        const subscriber = entityRef.where("id", "==", pedidoID).onSnapshot(querySnapshot => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach(documentSnapshot => {

                    if (documentSnapshot.data().email === auth?.currentUser?.email) {
                        const pedidos = []
                        pedidos.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id
                        })
                        setPedido(pedidos)
                    }
                    else {
                        //En caso de no encontrar el codigo vuelve a la pantalla UserHomeScreen hasta que ponga el id de envio valido
                        props.navigation.navigate('ConsultarPedido')
                        alert('El Codigo de envío no pertenece a ninguno de sus pedidos')
                    }
                })

            }
            else {
                props.navigation.navigate('ConsultarPedido')
                alert('El código de envío no existe')
            }
        })
    }, [])


    useEffect(() => {
        historicoRef.where("id", "==", pedidoID).get().then(querySnapshot => {
            if (!querySnapshot.empty) {
                entityRef.doc(pedidoID).delete()
            }
        })
    }, [])

    return (
        <FlatList style={PedidoStyles.container} data={pedido} renderItem={({ item }) => (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        loading && <View style={PedidoStyles.activityIndicator}>
                            <ActivityIndicator color="#08AFA5" size={150} />
                        </View>
                    }
                    {
                        !loading && <View>
                            <View>
                                <Text style={PedidoStyles.inputLabelTituloPedidoID}>Código de envío</Text>
                                <Text style={PedidoStyles.inputLabelPedidoId}>{pedidoID}</Text>
                            </View>
                            <View style={PedidoStyles.linea} />
                            <View>
                                <Text style={PedidoStyles.inputLabelTitulo}>Dirección de entrega</Text>
                                <Text style={PedidoStyles.inputLabelDatos}>{item.direccion}</Text>
                            </View>
                            <View>
                                <Text style={PedidoStyles.inputLabelTitulo}>Fecha estimada de entrega</Text>
                                <Text style={PedidoStyles.inputLabelDatos}>{item.fechaEntrega}</Text>
                            </View>
                            <View>
                                <Text style={PedidoStyles.inputLabelTitulo}>Hora estimada de entrega</Text>
                                <Text style={PedidoStyles.inputLabelDatos}>{item.horaEntrega}</Text>
                            </View>
                            <View>
                                <Text style={PedidoStyles.inputLabelTitulo}>Observaciones</Text>
                                <Text style={PedidoStyles.inputLabelDatos}>{item.observaciones}</Text>
                            </View>
                            <View>
                                <Text style={PedidoStyles.inputLabelTitulo}>Peso</Text>
                                <Text style={PedidoStyles.inputLabelDatos}>{parseInt(sensor.peso)} g</Text>
                            </View>
                            <View>
                                <Text style={PedidoStyles.inputLabelTitulo}>Temperatura</Text>
                                <Text style={PedidoStyles.inputLabelDatos}>{parseInt(sensor.temperatura)} C°</Text>
                            </View>
                            <View style={PedidoStyles.botonMapa}>
                                <Button color="#08AFA5" title="Ver Mapa" onPress={() => props.navigation.navigate('SeguirPedido', { idPedido: pedidoID })}></Button>
                            </View>
                            <View style={{ paddingTop: 10, flexDirection: "row", justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#08AFA5', alignItems: 'center', justifyContent: 'center', width: 75, height: 75, backgroundColor: '#08AFA5', borderRadius: 50 }}>
                                    <Ionicons name="chatbubbles" size={50} color="#003748" onPress={() => props.navigation.navigate('Chat', { idPedido: pedidoID, email: item.email })}></Ionicons>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#08AFA5', alignItems: 'center', justifyContent: 'center', width: 75, height: 75, backgroundColor: '#08AFA5', borderRadius: 50 }}>
                                    <Ionicons name="qr-code-outline" size={50} color="#003748" onPress={() => props.navigation.navigate("QRScanner", { idPedido: pedidoID, fecha: item.fechaEntrega, direccion: item.direccion, localidad: item.localidad, provincia: item.provincia, email: item.email })}></Ionicons>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#08AFA5', alignItems: 'center', justifyContent: 'center', width: 75, height: 75, backgroundColor: '#08AFA5', borderRadius: 50 }}>
                                    <FontAwesome name="pencil-square" size={50} color="#003748" onPress={() => props.navigation.navigate("ReprogramarEnvio", { idPedido: pedidoID, direccion: item.direccion, piso: item.piso, localidad: item.localidad, codigoPostal: item.codigoPostal, observaciones: item.observaciones, fechaEntrega: item.fechaEntrega, horaEntrega: item.horaEntrega, costo: item.costo })}></FontAwesome>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }


                </ScrollView>
            </SafeAreaView>
        )}>
        </FlatList>
    )
}

export default PedidoScreen