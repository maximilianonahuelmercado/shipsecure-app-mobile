import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, Button, SafeAreaView, EventEmitter } from 'react-native';
import { Avatar } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import HomeStyles from '../styles/HomeStyles';
import { TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser'
import { db, auth, nt } from '../database/firebase';
import Modal from 'react-native-modal'
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {

    const [alias, setAlias] = useState("")
    const [show, setShow] = useState(false);

    const [modalLogout, setModalLogout] = useState(false)

    const entityRef = db.collection("usuarios")

    //Para poder cambiar el alias cada vez que la edito
    //const isFocused = useIsFocused()

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft: ()=> (
                <Ionicons size={40} name="menu" style={{paddingLeft:15}} onPress={()=>navigation.openDrawer()}></Ionicons>
            ),
            headerRight:()=>(
                <Ionicons size={35} name="log-out" style={{paddingRight:15}} onPress={signOut}></Ionicons>
            )
        })
    })

    
    const toggleModalLogout = () => {
        setModalLogout(!modalLogout)
    }

    useEffect(()=>{/*
        console.log(auth.currentUser.displayName)
        auth?.currentUser?.updateProfile({displayName: auth?.currentUser?.displayName})*/

        if(auth?.currentUser?.displayName){
            entityRef.where("email", "==", auth?.currentUser?.email).onSnapshot(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    const al = documentSnapshot.data().alias
                    setAlias(al)
                    if(documentSnapshot.data().esEmpleado){
                        setShow(true)
                    }
                    else{
                        setShow(false)
                    }
                })
            })
        }
        else{
            auth.signOut().then(()=>{
                alert('Cuenta creada con éxito!, por favor ingrese con sus credenciales')
                navigation.replace('Login')
            })

        }
        
    },[]) 
    //[isFocused])

    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            //setModalLogout(true)
            navigation.replace('Login')
        }).catch((error) => {
            //setModalLogout(true)
            navigate.replace('Login')
        });
    }

   const _handleOpenChatBot = () => {
        WebBrowser.openBrowserAsync('https://webchat.snatchbot.me/ec5dbd5775390aa38be0b77c9e84589305c6bf629cd5f1651eee66446b446559')
    }

    return ( 
    
     <SafeAreaView style={HomeStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={HomeStyles.avatar}>
                <Avatar rounded size={200} source={auth?.currentUser?.photoURL ? {uri: auth?.currentUser?.photoURL} : {uri: "https://i.ibb.co/jGwMwn4/Microsoft-Teams-image.png"}}></Avatar>
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
            <View style={{flexDirection: "row", justifyContent: 'space-evenly'}}>
                <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:75, height:75, backgroundColor:'#08AFA5', borderRadius:50}}>
                    <Ionicons name="search" size={50} color="#003748" onPress={() => navigation.navigate("ConsultarPedido")}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:75, height:75, backgroundColor:'#08AFA5', borderRadius:50}}>
                    <Ionicons name="create-outline" size={50} color="#003748" onPress={() => navigation.navigate("CrearEnvio")}></Ionicons>
                </TouchableOpacity>
            </View>
            {   
                show && (
                    <View style={{alignSelf:'center'}}>
                        <Text style={HomeStyles.labelTextoEntregarPedido}>Entregar pedido</Text>
                    <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:75, height:75, backgroundColor:'#08AFA5', borderRadius:50, marginLeft: '3%'}}>
                        <Ionicons name="cube" size={50} color="#003748" onPress={()=> navigation.navigate("Repartidor")}></Ionicons>
                    </TouchableOpacity>     
                </View>
                )
            }
            <View>
                <Text style={HomeStyles.inputLabelChatBot}>¿Necesitas ayuda? ¡Comunícate con ShipBot!</Text>
            </View>
            <View style={HomeStyles.botonChatBot}>
                <Button color="#08AFA5" title="Chatear" onPress={_handleOpenChatBot}></Button>
            </View>
            <Modal isVisible={modalLogout}>
                        <View style={HomeStyles.modal}>
                            <Ionicons name="person" size={150} color="#003348"></Ionicons>
                            <Text style={HomeStyles.modalTextCamposObligatorios}>¡Se ha creado su cuenta con éxito!{"\n"} Por favor ingrese con sus credenciales</Text>
                            <View style={HomeStyles.modalCaja}>
                            </View>
                            <View>
                                <Button color="#08AFA5" title="VOLVER" onPress={toggleModalLogout} />
                            </View>
                        </View>
            </Modal>
        </ScrollView>
    </SafeAreaView>
    )

}

export default HomeScreen