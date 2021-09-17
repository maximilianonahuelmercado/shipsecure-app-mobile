import React, {useEffect, useState} from 'react';
import { View, Text,  Button, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { auth, db } from '../database/firebase';
import { Ionicons } from '@expo/vector-icons';
import BeneficiosStyles from '../styles/BeneficiosStyles'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import * as premios from '../assets/constants/premios'


const BeneficiosScreen = () => {

    const usuarioEntity = db.collection("usuarios")
    const [puntos, setPuntos] = useState(0)

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <AnimatedCircularProgress
                    size={200}
                    width={30}
                    style={BeneficiosStyles.progressBar}
                    fill={puntos}
                    tintColor="#08AFA5"
                    backgroundColor="#3d5875" />
                <View>
                    <Text style={BeneficiosStyles.puntos}>{puntos} pts</Text>
                </View>
                <View>
                    <Text style={BeneficiosStyles.texto}>Alcanza los 100 puntos para obtener el total de los beneficios de ShipSecure</Text>
                </View>
                <View>
                    <Text style={BeneficiosStyles.titulo}>Tus Beneficios</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}} >
                    <Ionicons name="gift-outline" size={20} color="#FF5733"></Ionicons>
                    <Text style={BeneficiosStyles.textoBA} >{puntos <= 10 ? premios.PRIMER_PREMIO : puntos < 30 ? premios.SEGUNDO_PREMIO : puntos < 50 ? premios.TERCER_PREMIO : puntos < 70 ? premios.CUARTO_PREMIO : puntos < 90 ? premios.QUINTO_PREMIO : puntos <= 99 ? premios.SEXTO_PREMIO : premios.SEPTIMO_PREMIO}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BeneficiosScreen