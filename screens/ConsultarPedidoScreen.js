import React, {useState} from 'react';
import { View, Text,  Button, TextInput, ScrollView } from 'react-native'
import ConsultarPedidoStyles from '../styles/ConsultarPedidoStyles'
import { Ionicons } from '@expo/vector-icons'

const ConsultarPedidoScreen = ({navigation}) => {
   const [idPedido, setIdPedido] = useState('')

    return (
        <ScrollView style={ConsultarPedidoStyles.container}>
            <View>
                <Text style={ConsultarPedidoStyles.inputLabelCodigo}>Ingresá tu código de envío: </Text>
            </View>
            <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:20}}>
                <Ionicons size={15} name="alert-circle-outline" color="#FF5733"></Ionicons>
                <Text style={{marginLeft: 5, color:"#FF5733", fontWeight:'bold', fontSize:12}}>El código de envío te lo enviaremos por correo</Text>
            </View>
            <View>
                <TextInput style={ConsultarPedidoStyles.input} placeholder="Código de envío" placeholderTextColor="#687D87" onChangeText={(value) => setIdPedido(value)}></TextInput>
            </View>
            <View style={ConsultarPedidoStyles.botonConsultar}>
                <Button color="#08AFA5"  title="Consultar" onPress={() => navigation.navigate('Pedido', {nroPedido: idPedido})}></Button>
            </View>
        </ScrollView>
    )
}

export default ConsultarPedidoScreen

