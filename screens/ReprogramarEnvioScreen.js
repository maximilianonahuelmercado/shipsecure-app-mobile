import React, {useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, SafeAreaView, Platform} from 'react-native'
import { MaterialIcons  } from '@expo/vector-icons'
import ReprogramarEnvioStyles from '../styles/ReprogramarEnvioStyles'
import {CheckBox} from 'react-native-elements'
import { db }  from '../database/firebase'
import DateTimePicker from '@react-native-community/datetimepicker'


const ReprogramarEnvioScreen = (props) => {


    const [date, setDate] = useState(new Date(Date.now()))
    const [show, setShow] = useState(false)

    //console.log(date.toISOString().split('T')[0])

    const showMode = () => {
        setShow(true)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setDate(currentDate)
        if(Platform.OS === 'android'){
            setShow(false)
        }
    }


    const entityRef = db.collection('envios')
    //props necesarias para que los hooks tengan un valor por defecto, de lo contrario si algun dato no se quiere actualizar se va a updatear igual en la base como vacio
    const idPedido = (props.route.params.idPedido).toString()
    const direccionOriginal = (props.route.params.direccion).toString()
    const observaciones = (props.route.params.observaciones).toString()
    const fechaEntrega = (props.route.params.fechaEntrega).toString()
    const horaEntrega = (props.route.params.horaEntrega).toString()
    //Hooks para el checkbox
    const [isSelectedDirection, setSelectionDirection] = useState(false)
    const [isSelectedDateTime, setSelectionDateTime] = useState(false)

    const [direccion, setDireccion] = useState(direccionOriginal)
    const [descripcion, setDescripcion] = useState(observaciones)
    const [fecha, setFecha] = useState(fechaEntrega)
    const [hora, setHora] = useState(horaEntrega)

    //console.log(JSON.stringify(props.route.params.idPedido))

    const updateEnvio = () => {
        entityRef.doc(idPedido).update({
            direccion: direccion,
            fechaEntrega: fecha,
            horaEntrega: hora,
            observaciones: descripcion
        }).then(()=>{console.log('Actualizacion correcta!')})
        props.navigation.navigate("Home")
    }

    return (
    <SafeAreaView style={ReprogramarEnvioStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <MaterialIcons name="edit-location" size={40} color={'#08AFA5'}/>
                <Text style={ReprogramarEnvioStyles.inputLabelTituloReprogramarEnvio}>Reprogramar Envío</Text>
            </View>
            <View style={ReprogramarEnvioStyles.linea}/>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={ReprogramarEnvioStyles.titulo}>¿Quieres cambiar la dirección?</Text>
                <CheckBox uncheckedColor='#08AFA5' checkedColor='#FF5733' checked={isSelectedDirection} onPress={()=>setSelectionDirection(!isSelectedDirection)}></CheckBox>
            </View>
            <View>
               <Text style={ReprogramarEnvioStyles.label}>Dirección</Text>
               <TextInput style={ReprogramarEnvioStyles.input} editable={isSelectedDirection == true ? true : false} value={direccion} onChangeText={(text)=>setDireccion(text)}></TextInput>
               <Text style={ReprogramarEnvioStyles.label}>Descripcion</Text>
               <TextInput style={ReprogramarEnvioStyles.inputMultiline} editable={isSelectedDirection == true ? true : false} multiline={true} numberOfLines={4} value={descripcion} onChangeText={(text)=>setDescripcion(text)}></TextInput>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={ReprogramarEnvioStyles.titulo}>¿Quieres cambiar el horario?</Text>
                <CheckBox uncheckedColor='#08AFA5' checkedColor='#FF5733' checked={isSelectedDateTime} onPress={()=>setSelectionDateTime(!isSelectedDateTime)}></CheckBox>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={ReprogramarEnvioStyles.label}>Nueva Fecha</Text>
                <Text style={ReprogramarEnvioStyles.label}>Nueva Hora</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput style={ReprogramarEnvioStyles.inputDateTime} editable={isSelectedDateTime == true ? true : false} value={fecha} onChangeText={(text)=>setFecha(text)}></TextInput>
                <TextInput style={ReprogramarEnvioStyles.inputDateTime} editable={isSelectedDateTime == true ? true : false} value={hora} onChangeText={(text)=>setHora(text)}></TextInput>
            </View>
            <View>
                <View>
                    <Text onPress={showMode}></Text>
                </View>
                {   
                   show && (<DateTimePicker testID="dateTimePicker" value={date} mode={'date'} is24Hour={true} display="default" onChange={onChange}/>)
                }               
            </View>
            <View style={{flexDirection: 'row'}}>
                <MaterialIcons name="info" size={24} color="#FF4916" />
                <Text style={ReprogramarEnvioStyles.infoText}>Una vez que se envien los datos para reprogramar el envío se notificará automáticamente la modificación al repartidor y le llegará a su cuenta de mail el comprobante con el detalle y costo adicional del envío</Text>
            </View>
            <View style={ReprogramarEnvioStyles.botonEnviar}>
                <Button color="#08AFA5" title="Enviar" onPress={ () => updateEnvio()}></Button>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default ReprogramarEnvioScreen