import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, SafeAreaView} from 'react-native'
import CrearEnvioStyles from '../styles/CrearEnvioStyles'
import {CheckBox} from 'react-native-elements'
import { Button } from 'react-native';
import { db }  from '../database/firebase'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'

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
    const [dni, setDNI] = useState('')
    const [email, setEmail] = useState('')
    const [direccion, setDireccion] = useState('')
    const [piso, setPiso] = useState('')
    const [localidad, setLocalidad] = useState('')
    const [codigoPostal, setCodigoPostal] = useState('')
    const [provincia, setProvincia] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [peso, setPeso] = useState('')
    const [temperatura, setTemperatura] = useState('')

    const [date, setDate] = useState(new Date(Date.now()));
    const [hour, setHour] = useState(new Date(Date.now()))
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };

      const onChangeHour = (event, selectedDate) => {
        const currentHour = selectedDate || hour;
        setShowTime(Platform.OS === 'ios');
        setHour(currentHour);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showTimeMode = (currentMode) => {
          setShowTime(true);
          setMode(currentMode);
      }

      const showDatepicker = () => {
        showMode('datetime');
      };

      const showTimePicker = () => {
        showTimeMode('time')
      }
    

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
            dni: dni,
            email: email,
            direccion: direccion,
            piso: piso,
            localidad: localidad,
            codigoPostal: codigoPostal,
            provincia: provincia,
            observaciones: observaciones,
            fechaEntrega: date.toLocaleDateString('es-AR'),
            horaEntrega: hour.toLocaleTimeString('es-AR'),
            peso: peso,
            temperatura: temperatura,
            //estos campos seran necesarios luego para asignar un repartidor, una smartbox
            usuarioCreado: false,
            idSmartBox: "",
            idRepartidor: ""
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
            <View>
                <Text style={CrearEnvioStyles.label}>Nombres</Text>
                <TextInput style={CrearEnvioStyles.input} value={nombre} onChangeText={(text)=>setNombre(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Apellidos</Text>
                <TextInput style={CrearEnvioStyles.input} value={apellido} onChangeText={(text)=>setApellido(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>DNI</Text>
                <TextInput style={CrearEnvioStyles.input} placeholderTextColor="#687D87" value={dni} onChangeText={(text)=>setDNI(text)}></TextInput>     
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Email</Text>
                <TextInput style={CrearEnvioStyles.input} value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.titulo}>DATOS DE ENVÍO</Text>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Dirección</Text>
                <TextInput style={CrearEnvioStyles.input} value={direccion} onChangeText={(text)=>setDireccion(text)}></TextInput> 
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Piso/Departamento</Text>
                <TextInput style={CrearEnvioStyles.input} value={piso} onChangeText={(text)=>setPiso(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Localidad</Text>
                <TextInput style={CrearEnvioStyles.input} value={localidad} onChangeText={(text)=>setLocalidad(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Código Postal</Text>
                <TextInput style={CrearEnvioStyles.input} value={codigoPostal} onChangeText={(text)=>setCodigoPostal(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Provincia</Text>
                <TextInput style={CrearEnvioStyles.input} value={provincia} onChangeText={(text)=>setProvincia(text)}></TextInput>
            </View>
            <View>
                 <Text style={CrearEnvioStyles.label}>Observaciones</Text>
                <TextInput style={CrearEnvioStyles.textArea} multiline={true} numberOfLines={4} value={observaciones} onChangeText={(text)=>setObservaciones(text)}></TextInput>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <CheckBox  uncheckedColor='#08AFA5' checkedColor='#FF5733' checked={isSelected} onPress={()=>setSelection(!isSelected)}></CheckBox>
                <Text style={CrearEnvioStyles.labelEnvioProgramado}>¿Es envío programado?</Text>
            </View>
            {
                isSelected && (
                <View>
                <Text style={CrearEnvioStyles.label}>Fecha de entrega</Text>
                <View style={{flexDirection:'row'}}> 
                    <Ionicons name="calendar-outline" size={25} onPress={showDatepicker} color="#FF5733" style={CrearEnvioStyles.icono}></Ionicons>
                        <Text style={CrearEnvioStyles.fecha}>{date.toLocaleDateString('es-AR')}</Text>
                        {show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            />
                        )}
                </View>
                <Text style={CrearEnvioStyles.label}>Hora de entrega</Text>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="time" size={25} onPress={showTimePicker} color="#FF5733" style={CrearEnvioStyles.icono}></Ionicons>
                    <Text style={CrearEnvioStyles.fecha}>{hour.toLocaleTimeString('es-AR')}</Text>
                    {showTime && (
                        <DateTimePicker
                        testID="TimePicker"
                        value={hour}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeHour}
                        />
                    )}
                </View>
             </View>
                )}
            <View>
                <Text style={CrearEnvioStyles.titulo}>DATOS DE PEDIDO</Text>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Peso (en Kg)</Text>
                <TextInput style={CrearEnvioStyles.input} value={peso} onChangeText={(text)=>setPeso(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Temperatura (en C°)</Text>
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