import React, {useState} from 'react';
import { View, Text,  Button, TextInput, ScrollView } from 'react-native'
import UserHomeStyles from '../styles/UserHomeStyles'
import { Ionicons } from '@expo/vector-icons'

const UserHomeScreen = (props) => {
    const [state, setState] = useState({
        nroPedido: "",
    })

const handleChangeText = (nroPedido, value) => {
    setState({...state, [nroPedido]: value})
}

    return (
        <ScrollView style={UserHomeStyles.container}>
            <View>
                <Text style={UserHomeStyles.inputLabelCodigo}>Ingresá tu código de envío</Text>
                <Ionicons name="alert-circle-outline" color="#FF5733"></Ionicons>
            </View>
            <View>
                <TextInput style={UserHomeStyles.input} placeholder="Código de envío" placeholderTextColor="#687D87" onChangeText={(value) => handleChangeText('nroPedido', value)}></TextInput>
            </View>
            <View style={UserHomeStyles.botonConsultar}>
                <Button color="#08AFA5"  title="Consultar" onPress={() => props.navigation.navigate('PedidoScreen', {nroPedido: JSON.parse(state.nroPedido)})}></Button>
            </View>
        </ScrollView>
    )
}

export default UserHomeScreen

