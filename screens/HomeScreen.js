import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, SafeAreaView, EventEmitter } from 'react-native';
import { Avatar } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import HomeStyles from '../styles/HomeStyles';
import { TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser'
import { db, auth } from '../database/firebase';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = (props) => {

    const [alias, setAlias] = useState("")

    const entityRef = db.collection("usuarios")

    //Para poder cambiar el alias cada vez que la edito
    //const isFocused = useIsFocused()

    useEffect(()=>{/*
        console.log(auth.currentUser.displayName)
        auth?.currentUser?.updateProfile({displayName: auth?.currentUser?.displayName})*/

        if(auth?.currentUser?.displayName){
            entityRef.where("email", "==", auth?.currentUser?.email).onSnapshot(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    const al = documentSnapshot.data().alias
                    console.log(al)
                    setAlias(al)
                    console.log(alias)
                })
            })
        }
        else{
            auth.signOut().then(()=>{
                alert('Cuenta creada con éxito!, por favor ingrese con sus credenciales')
                props.navigation.replace('Login')
            })

        }
        
    },[]) 
    //[isFocused])

    const signOut = () => {
        console.log(auth.currentUser)
        auth.signOut().then(() => {
            // Sign-out successful.
            props.navigation.replace('Login')
        }).catch((error) => {
            alert('Se ha desconectado')
            props.navigate.replace('Login')
        });
    }

   const _handleOpenChatBot = () => {
        WebBrowser.openBrowserAsync('https://webchat.snatchbot.me/ec5dbd5775390aa38be0b77c9e84589305c6bf629cd5f1651eee66446b446559')
    }

    return ( 
        
     <SafeAreaView style={HomeStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={HomeStyles.avatar}>
                <Avatar rounded size={200} source={{uri: auth?.currentUser?.photoURL}}></Avatar>
            </View>
            <View >
                <Text style={HomeStyles.saludo}>¡Hola {alias ? alias : auth?.currentUser?.displayName}!</Text>
            </View>
            <View >
                <Text style={HomeStyles.pregunta}>¿Qué deseas hacer con tu ShipSecure?</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: 'center'}}>
                <Text style={HomeStyles.labelTextoSeguirEnvio}>Seguir envío</Text>
                <Text style={HomeStyles.labelTextoCrearPedido}>Crear pedido</Text>
                
            </View>
            <View style={{flexDirection: "row", justifyContent: 'center'}}>
                <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:75, height:75, backgroundColor:'#08AFA5', borderRadius:50, marginRight: 90}}>
                    <Ionicons name="eye-outline" size={50} color="#003748" onPress={() => props.navigation.navigate("ConsultarPedido")}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:75, height:75, backgroundColor:'#08AFA5', borderRadius:50}}>
                    <Ionicons name="add-circle" size={50} color="#003748" onPress={() => props.navigation.navigate("CrearEnvio")}></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
                <Text style={HomeStyles.labelTextoEntregarPedido}>Entregar pedido</Text>
            </View>
            <View style={{alignSelf:'center'}}>
                <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:75, height:75, backgroundColor:'#08AFA5', borderRadius:50}}>
                    <Ionicons name="bus" size={50} color="#003748" onPress={()=> props.navigation.navigate("ConsultarPedido")}></Ionicons>
                </TouchableOpacity>     
            </View>
            <View>
                <Text style={HomeStyles.inputLabelChatBot}>¿Necesitas ayuda? ¡Comunícate con ShipBot!</Text>
            </View>
            <View style={HomeStyles.botonChatBot}>
                <Button color="#08AFA5" title="Chatear" onPress={_handleOpenChatBot}></Button>
            </View>
            <View style={HomeStyles.botonChatBot}>
                <Button color="#08AFA5" title="Cerrar Sesion" onPress={signOut}></Button>
            </View>
        </ScrollView>
    </SafeAreaView>
    )

}

export default HomeScreen