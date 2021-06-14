import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Button} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import EnvioCreadoStyles from '../styles/EnvioCreadoStyles'

const EnvioCreadoScreen = (props) => {
    
    return (
        <SafeAreaView style={EnvioCreadoStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flexDirection: 'row', justifyContent:'center'}}>
                    <Ionicons name="checkmark-circle" size={150} color="#08AFA5"></Ionicons>
                </View>
                <View>
                    <Text style={EnvioCreadoStyles.label}>ENVÍO CREADO</Text>
                </View>
                <View style={EnvioCreadoStyles.linea}/>
                <View>
                    <Text style={EnvioCreadoStyles.texto}>En unos instantes le llegará un correo al mail del contacto con el comprobante y los datos para acceder a su cuenta</Text>
                </View>
                <View style={EnvioCreadoStyles.botonRegresar}>
                    <Button color="#08AFA5" title="REGRESAR" onPress={() => props.navigation.navigate('Home')}></Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EnvioCreadoScreen