import React, {useState} from 'react';
import { View, Text,  Button, TextInput, ScrollView } from 'react-native'
import UserHomeStyles from '../styles/UserHomeStyles'
import { Avatar } from 'react-native-elements'
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
            <View style={UserHomeStyles.avatar}>
                <Avatar size='xlarge' rounded source={{uri: 'http://assets.stickpng.com/images/585e4beacb11b227491c3399.png'}}></Avatar>
            </View>
            <View >
                <Text style={UserHomeStyles.saludo}>¡Hola Usuario!</Text>
            </View>
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
            <View>
                <Text style={UserHomeStyles.inputLabelChatBot}>¿Necesitas ayuda? ¡Comunícate con ShipBot!</Text>
            </View>
            <View style={UserHomeStyles.botonChatBot}>
                <Button color="#08AFA5" title="Chatear" onPress={() => props.navigation.navigate('ChatBotScreen')}></Button>
            </View>
        </ScrollView>
    )
}

export default UserHomeScreen

