import React, {useState, useEffect, useLayoutEffect} from 'react';
import { View, Text,  Button, TextInput,FlatList, SafeAreaView, ScrollView } from 'react-native'
import { db, auth } from '../database/firebase';
import HistoricoStyles from '../styles/HistoricoStyles';
import { Ionicons } from '@expo/vector-icons'

const HistoricoScreen = ({navigation}) => {

    const [users, setUsers] = useState()
    const entityRef =db.collection('historicos')

    useLayoutEffect(()=>{
      navigation.setOptions({
          headerLeft: ()=> (
              <Ionicons size={40} name="menu" style={{paddingLeft:15}} onPress={()=>navigation.openDrawer()}></Ionicons>
          )
      })
    })

    useEffect(() => {
        const subscriber = entityRef.where("email", "==", auth?.currentUser?.email).onSnapshot(querySnapshot => {
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
      <SafeAreaView style={HistoricoStyles.container}>
      <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
        <Ionicons name="checkbox-outline" size={35} color={'#08AFA5'}/>
        <Text style={HistoricoStyles.inputLabelTitulo}>Histórico de Envíos</Text>  
      </View>
      <View style={HistoricoStyles.linea}/>
        <FlatList   
            data={users}
            renderItem={({ item }) => (
                    <SafeAreaView>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ height: '100%', justifyContent: 'space-evenly', backgroundColor: "#2E4B5B"}}>
                        <Text style={HistoricoStyles.texto}>{item.fecha}</Text>
                        <Text style={HistoricoStyles.texto}>{item.direccion}</Text>
                        <Text style={HistoricoStyles.texto}>{item.localidad}</Text>
                        <Text style={HistoricoStyles.texto}>{item.provincia}</Text>
                        <Text style={HistoricoStyles.texto}>Entregado por ShipSecure</Text>
                        </View>
                        </ScrollView>
                        <Text></Text>
                  </SafeAreaView>              
            )}
            />        
      </SafeAreaView>
          )
                            
}

export default HistoricoScreen

