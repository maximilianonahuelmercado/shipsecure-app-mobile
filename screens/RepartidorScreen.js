import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, SafeAreaView, EventEmitter, TextPropTypes } from 'react-native';
import RepartidorStyles from '../styles/RepartidorStyles';


const HomeScreen = (props) => {

    return ( 
        
     <SafeAreaView style={RepartidorStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={RepartidorStyles.botonChatBot}>
                <Button color="#08AFA5" title="Chatear" onPress={props.navigation.navigate('Chat', {idPedido: "999999"})}></Button>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default HomeScreen