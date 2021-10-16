import React, {useState} from 'react';
import { View, Text,  Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import DetallePedidoStyles from '../styles/DetallePedidoStyles'
import { Ionicons } from '@expo/vector-icons'

const DetallePedidoScreen = (props) => {

 
    const idPedido = (props.route.params.idPedido).toString()
    const direccion = (props.route.params.direccion).toString()
    const observaciones = (props.route.params.observaciones).toString()
    const fechaEntrega = (props.route.params.fechaEntrega).toString()
    const horaEntrega = (props.route.params.horaEntrega).toString()

        return (
        <SafeAreaView style={DetallePedidoStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                        <Ionicons name="documents-outline" size={35} color={'#08AFA5'}/>
                        <Text style={DetallePedidoStyles.inputLabelTitulo}>Detalle</Text>  
                    </View>
                    <View style={DetallePedidoStyles.linea}/>
                    <View>
                        <Text style={DetallePedidoStyles.label}>Código de Envío</Text>
                        <Text style={DetallePedidoStyles.texto}>{idPedido}</Text>
                    </View>
                    <View>
                        <Text style={DetallePedidoStyles.label}>Direccion</Text>
                        <Text style={DetallePedidoStyles.texto}>{direccion}</Text>
                    </View>
                    <View>
                        <Text style={DetallePedidoStyles.label}>Observaciones</Text>
                        <Text style={DetallePedidoStyles.texto}>{observaciones}</Text>
                    </View>
                    <View>
                        <Text style={DetallePedidoStyles.label}>Fecha estimada de entrega</Text>
                        <Text style={DetallePedidoStyles.texto}>{fechaEntrega}</Text>
                    </View>
                    <View>
                        <Text style={DetallePedidoStyles.label}>Hora estimada de entrega</Text>
                        <Text style={DetallePedidoStyles.texto}>{horaEntrega}</Text>
                    </View>
                    <View style={{alignSelf: 'center', padding: '15%'}}>
                        <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:100, height:100, backgroundColor:'#08AFA5', borderRadius:50}}>
                            <Ionicons name="chatbubbles" size={70} color="#003748" onPress={() => props.navigation.navigate('Chat', {idPedido: idPedido})}></Ionicons>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </SafeAreaView>
        )
    }

export default DetallePedidoScreen

