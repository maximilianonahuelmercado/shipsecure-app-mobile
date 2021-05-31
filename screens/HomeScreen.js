import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons, MaterialCommunityIcons, FontAwesomeIcon } from '@expo/vector-icons';
import {Icon} from 'react-native-elements'
import HomeStyles from '../styles/HomeStyles';

const HomeScreen = (props) => {
    
    return (
        <ScrollView style={HomeStyles.container}>
            <View style={HomeStyles.avatar}>
                <Avatar size='xlarge' rounded source={{uri: 'http://assets.stickpng.com/images/585e4beacb11b227491c3399.png'}}></Avatar>
            </View>
            <View >
                <Text style={HomeStyles.saludo}>¡Hola Usuario!</Text>
            </View>
            <View >
                <Text style={HomeStyles.pregunta}>¿Qué deseas hacer con tu ShipSecure?</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: 'center'}}>
                <Text style={HomeStyles.labelTextoSeguirEnvio}>Seguir envío</Text>
                <Text style={HomeStyles.labelTextoCrearPedido}>Crear pedido</Text>
                
            </View>
            <View style={{flexDirection: "row", justifyContent: 'center'}}>
                <Ionicons  style={HomeStyles.botonSeguirEnvio} name="eye-outline" size={50} color="#08AFA5" onPress={() => props.navigation.navigate("UserHomeScreen")}></Ionicons>
                <Ionicons  style={HomeStyles.botonCrearEnvio} name="add-circle" size={50} color="#08AFA5" onPress={() => props.navigation.navigate("HomeScreen")}></Ionicons>
            </View>
            <View>
                <Text style={HomeStyles.labelTextoEntregarPedido}>Entregar pedido</Text>
                <Ionicons style={HomeStyles.botonEntregarPedido} name="bus" size={50} color="#08AFA5" onPress={()=> props.navigation.navigate("HomeScreen")}></Ionicons>
            </View>
            <View>
                <Text style={HomeStyles.inputLabelChatBot}>¿Necesitas ayuda? ¡Comunícate con ShipBot!</Text>
            </View>
            <View style={HomeStyles.botonChatBot}>
                <Button color="#08AFA5" title="Chatear" onPress={() => props.navigation.navigate('ChatBotScreen')}></Button>
            </View>
        </ScrollView>
    )
}

export default HomeScreen