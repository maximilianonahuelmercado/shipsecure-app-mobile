import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, SafeAreaView} from 'react-native'
import CrearEnvioStyles from '../styles/CrearEnvioStyles'
import {CheckBox} from 'react-native-elements'
import { Button } from 'react-native';

const CrearEnvioScreen = (props) => {

    //Hook para el checkbox
    const [isSelected, setSelection] = useState(false)

    return (
    //Usar un safeArea antes de cada scrollview
     <SafeAreaView style={CrearEnvioStyles.container}> 
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <Text style={CrearEnvioStyles.titulo}>DATOS DE CONTACTO</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={CrearEnvioStyles.label}>Nombres</Text>
                <Text style={CrearEnvioStyles.label}>Apellidos</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Fecha de Nacimiento</Text>
                <Text style={CrearEnvioStyles.label}>Email</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input} placeholder="dd/mm/aaaa" placeholderTextColor="#687D87"></TextInput>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.titulo}>DATOS DE ENVÍO</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Dirección</Text>
                <Text style={CrearEnvioStyles.label}>Piso/Departamento</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Localidad</Text>
                <Text style={CrearEnvioStyles.label}>Código Postal</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Provincia</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Observaciones</Text>
            </View>
            <View>
                <TextInput style={CrearEnvioStyles.textArea} multiline={true} numberOfLines={4}></TextInput>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <CheckBox  uncheckedColor='#08AFA5' checkedColor='#FF5733' checked={isSelected} onPress={()=>setSelection(!isSelected)}></CheckBox>
                <Text style={CrearEnvioStyles.labelEnvioProgramado}>¿Es envío programado?</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Fecha de entrega</Text>
                <Text style={CrearEnvioStyles.label}>Hora de entrega</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input} placeholder="dd/mm/aaaa" placeholderTextColor="#687D87" editable={isSelected == true ? true : false}></TextInput>
                <TextInput style={CrearEnvioStyles.input} placeholder="00:00 am - 23:59 pm" placeholderTextColor="#687D87" editable={isSelected == true ? true : false}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.titulo}>DATOS DE PEDIDO</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Peso</Text>
                <Text style={CrearEnvioStyles.label}>Temperatura</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
                <TextInput style={CrearEnvioStyles.input}></TextInput>
            </View>
            <View style={CrearEnvioStyles.botonCrearEnvio}>
                <Button color="#08AFA5"  title="CONFIRMAR ENVÍO" onPress={() => props.navigation.navigate("Home")}></Button>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default CrearEnvioScreen