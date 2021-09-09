import React, {useEffect, useState} from 'react';
import { View, Text,  Button, TextInput, ScrollView, SafeAreaView } from 'react-native'
import { auth, db } from '../database/firebase';
import { Ionicons } from '@expo/vector-icons';
import BeneficiosStyles from '../styles/BeneficiosStyles'

const BeneficiosScreen = () => {

    const usuarioEntity = db.collection("usuarios")

        const [puntos, setPuntos] = useState('')
         
        useEffect(()=>{
            usuarioEntity.where('email', '==', auth?.currentUser?.email).onSnapshot(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    var puntos = documentSnapshot.data().puntos
                    setPuntos(puntos)
                })
            })
        }, [])


    return (
        <SafeAreaView style={BeneficiosStyles.container}> 
            <ScrollView>
                <View>
                    <Text style={BeneficiosStyles.puntos}>{puntos} pts</Text>
                </View>
                <View>
                    <Text style={BeneficiosStyles.titulo}>Próximos Beneficios</Text>
                </View>
                <View>
                    <Text style={BeneficiosStyles.texto}>Alcanza los 100 puntos para tener un 5% de descuento en tu próximo envío por ShipSecure</Text>
                </View>
                <View>
                    <Text style={BeneficiosStyles.titulo}>Beneficios Alcanzados</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Ionicons name="gift-outline" size={20} color="#FF5733"></Ionicons>
                    <Text style={BeneficiosStyles.textoBA}>Envío programado con 5% de descuento</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BeneficiosScreen