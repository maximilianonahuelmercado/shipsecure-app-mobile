import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, Button, SafeAreaView, FlatList,EventEmitter, TextPropTypes } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { db, auth } from '../database/firebase';
import RepartidorStyles from '../styles/RepartidorStyles';


const RepartidorScreen = ({navigation}) => {

    const [users, setUsers] = useState()
    const entityRef =db.collection('envios')

    useLayoutEffect(()=>{
      navigation.setOptions({
          headerLeft: ()=> (
              <Ionicons size={40} name="menu" style={{paddingLeft:15}} onPress={()=>navigation.openDrawer()}></Ionicons>
          )
      })
    })

    useEffect(() => {
        const subscriber = entityRef.where("idRepartidor", "==", auth?.currentUser?.email).onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setUsers(users);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);

    return (
      <SafeAreaView style={RepartidorStyles.container}>
      <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
        <FontAwesome5 name="truck" size={35} color={'#08AFA5'}/>
        <Text style={RepartidorStyles.inputLabelTitulo}>Pedidos a Entregar</Text>  
      </View>
      <View style={RepartidorStyles.linea}/>
        <FlatList   
            data={users}
            renderItem={({ item }) => (
                    <SafeAreaView>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ height: '100%', flexDirection:'row',  justifyContent: 'space-between', backgroundColor: "#2E4B5B"}}>
                            <View>
                                <Text style={RepartidorStyles.texto}>{item.id}</Text>
                            </View>
                            <Ionicons name="chevron-forward-sharp" size={40}  color={'#08AFA5'} style={{padding: '5%'}} onPress={()=>{navigation.navigate('Detalle Pedido', {idPedido: item.id, direccion: item.direccion, observaciones: item.observaciones, fechaEntrega: item.fechaEntrega, horaEntrega: item.horaEntrega})}}></Ionicons>
                        </View>
                        </ScrollView>
                        <Text></Text>
                  </SafeAreaView>              
            )}
            />        
      </SafeAreaView>
          )
                            
}

export default RepartidorScreen