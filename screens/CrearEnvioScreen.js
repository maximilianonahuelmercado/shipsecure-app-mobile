import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, SafeAreaView} from 'react-native'
import CrearEnvioStyles from '../styles/CrearEnvioStyles'
import {CheckBox} from 'react-native-elements'
import { Button } from 'react-native';
import { db }  from '../database/firebase'
import Mailer from 'react-native-email'
import RNSmtpMailer from 'react-native-smtp-mailer'
import sendEmail from 'react-native-email';

const CrearEnvioScreen = (props) => {

    const entityRef = db.collection('envios')
    //Hook para el checkbox
    const [isSelected, setSelection] = useState(false)
    //Hooks para los textInput
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [email, setEmail] = useState('')
    const [direccion, setDireccion] = useState('')
    const [piso, setPiso] = useState('')
    const [localidad, setLocalidad] = useState('')
    const [codigoPostal, setCodigoPostal] = useState('')
    const [provincia, setProvincia] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [horaEntrega, setHoraEntrega] = useState('')
    const [peso, setPeso] = useState('')
    const [temperatura, setTemperatura] = useState('')
    /*
   const handleEmail = (idPedido) => {
        Mailer(email, {
            subject: '¡Bienvenido a ShipSecure!',
            body: 'Su número de pedido es ' + idPedido + ' podra ingresar a la aplicación con la siguiente contraseña awfweaqwd ¡Recuerde cambiarla!'
        }).catch(console.error)
    }
    */

    const addEnvio = () => {
        //generamos un random de 6 digitos para el id de envio
        const idDoc = (100000 + Math.floor(Math.random() * 900000)).toString()
        entityRef.doc(idDoc).set({
            id: idDoc,
            nombres: nombre,
            apellidos: apellido,
            fechaNacimiento: fechaNacimiento,
            email: email,
            direccion: direccion,
            piso: piso,
            localidad: localidad,
            codigoPostal: codigoPostal,
            provincia: provincia,
            observaciones: observaciones,
            fechaEntrega: fechaEntrega,
            horaEntrega: horaEntrega,
            peso: peso,
            temperatura: temperatura
        })
        props.navigation.navigate("EnvioCreado")
     }

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
                <TextInput style={CrearEnvioStyles.input} value={nombre} onChangeText={(text)=>setNombre(text)}></TextInput>
                <TextInput style={CrearEnvioStyles.input} value={apellido} onChangeText={(text)=>setApellido(text)}></TextInput>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Fecha de Nacimiento</Text>
                <Text style={CrearEnvioStyles.label}>Email</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input} placeholder="dd/mm/aaaa" placeholderTextColor="#687D87" value={fechaNacimiento} onChangeText={(text)=>setFechaNacimiento(text)}></TextInput>
                <TextInput style={CrearEnvioStyles.input} value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.titulo}>DATOS DE ENVÍO</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Dirección</Text>
                <Text style={CrearEnvioStyles.label}>Piso/Departamento</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input} value={direccion} onChangeText={(text)=>setDireccion(text)}></TextInput>
                <TextInput style={CrearEnvioStyles.input} value={piso} onChangeText={(text)=>setPiso(text)}></TextInput>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Localidad</Text>
                <Text style={CrearEnvioStyles.label}>Código Postal</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input} value={localidad} onChangeText={(text)=>setLocalidad(text)}></TextInput>
                <TextInput style={CrearEnvioStyles.input} value={codigoPostal} onChangeText={(text)=>setCodigoPostal(text)}></TextInput>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Provincia</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input} value={provincia} onChangeText={(text)=>setProvincia(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Observaciones</Text>
            </View>
            <View>
                <TextInput style={CrearEnvioStyles.textArea} multiline={true} numberOfLines={4} value={observaciones} onChangeText={(text)=>setObservaciones(text)}></TextInput>
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
                <TextInput style={CrearEnvioStyles.input} placeholder="dd/mm/aaaa" placeholderTextColor="#687D87" editable={isSelected == true ? true : false} value={fechaEntrega} onChangeText={(text)=>setFechaEntrega(text)}></TextInput>
                <TextInput style={CrearEnvioStyles.input} placeholder="00:00 am - 23:59 pm" placeholderTextColor="#687D87" editable={isSelected == true ? true : false} value={horaEntrega} onChangeText={(text)=>setHoraEntrega(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.titulo}>DATOS DE PEDIDO</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <Text style={CrearEnvioStyles.label}>Peso</Text>
                <Text style={CrearEnvioStyles.label}>Temperatura</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <TextInput style={CrearEnvioStyles.input} value={peso} onChangeText={(text)=>setPeso(text)}></TextInput>
                <TextInput style={CrearEnvioStyles.input} value={temperatura} onChangeText={(text)=>setTemperatura(text)}></TextInput>
            </View>
            <View style={CrearEnvioStyles.botonCrearEnvio}>
                <Button color="#08AFA5"  title="CONFIRMAR ENVÍO" onPress={ () => addEnvio()}></Button>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default CrearEnvioScreen