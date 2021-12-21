import React, {useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, TextInput, SafeAreaView, Platform} from 'react-native'
import { MaterialIcons  } from '@expo/vector-icons'
import ReprogramarEnvioStyles from '../styles/ReprogramarEnvioStyles'
import {CheckBox} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { db, rt }  from '../database/firebase'
import Modal from 'react-native-modal'
import moment from 'moment'
import 'moment/locale/es'
import DateTimePicker from '@react-native-community/datetimepicker'


const ReprogramarEnvioScreen = (props) => {

    //console.log(date.toISOString().split('T')[0])

    const entityRef = db.collection('envios')
    //props necesarias para que los hooks tengan un valor por defecto, de lo contrario si algun dato no se quiere actualizar se va a updatear igual en la base como vacio
    const idPedido = (props.route.params.idPedido).toString()
    const direccionOriginal = (props.route.params.direccion).toString()
    const piso = (props.route.params.piso).toString()
    const localidad = (props.route.params.localidad).toString()
    const codigoPostal = (props.route.params.codigoPostal).toString()
    const observaciones = (props.route.params.observaciones).toString()
    const costo = (props.route.params.costo).toString()

    //Hooks para el checkbox
    const [isSelected, setIsSelected] = useState(false)
    const [isSelectedDirection, setIsSelectedDirection] = useState(false)
    const [direccion, setDireccion] = useState(direccionOriginal)
    const [descripcion, setDescripcion] = useState(observaciones)
    const [pisodepto, setPisoDepto] = useState(piso)
    const [local, setLocal] = useState(localidad)
    const [cp, setCP] = useState(codigoPostal)

    const [date, setDate] = useState(new Date(Date.now()));
    const [hour, setHour] = useState(new Date(Date.now()))
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState('date');
    const [showTime, setShowTime] = useState(false);
    const [flag, setFlag] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

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
        setFlag(true)
      }

    useEffect(()=>{

    },[isSelected])

    
    useEffect(()=>{

    },[isSelectedDirection])

    useEffect(()=>{
    },[isModalVisible])

    const updateEnvio = () => {
        if(isSelected){
            entityRef.doc(idPedido).update({
            direccion: direccion,
            fechaEntrega: moment(date).locale('es').format('L'),
            horaEntrega: moment(hour).locale('es').format('LT'),
            observaciones: descripcion,
            costo: parseFloat(costo) + 150
        }).then(()=>{
            rt.ref('/notificacion').update({
                fueReprogramado: true
            })
            setModalVisible(!isModalVisible);
        })
        }else{
            entityRef.doc(idPedido).update({
            direccion: direccion,
            observaciones: descripcion,
            costo: parseFloat(costo) + 150
        }).then(()=>{
            
        //alert('Actualizacion Correcta!')
        rt.ref('/notificacion').update({
            fueReprogramado: true
        })
            setModalVisible(!isModalVisible);
        })
        }
        
    }

    return (
    <SafeAreaView style={ReprogramarEnvioStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <MaterialIcons name="edit-location" size={35} color={'#08AFA5'}/>
                <Text style={ReprogramarEnvioStyles.inputLabelTituloReprogramarEnvio}>Reprogramar Envío</Text>
            </View>
            <View style={ReprogramarEnvioStyles.linea}/>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={ReprogramarEnvioStyles.titulo}>¿Quieres cambiar la dirección?</Text>
                <CheckBox uncheckedColor='#08AFA5' checkedColor='#FF5733' checked={isSelectedDirection} onPress={()=>setIsSelectedDirection(!isSelectedDirection)}></CheckBox>
            </View>
            <View>
               <Text style={ReprogramarEnvioStyles.label}>Dirección</Text>
               <TextInput style={isSelectedDirection ? ReprogramarEnvioStyles.input : ReprogramarEnvioStyles.inputBloq } editable={isSelectedDirection == true ? true : false} value={direccion} onChangeText={(text)=>setDireccion(text)}></TextInput>
               <Text style={ReprogramarEnvioStyles.label}>Piso/Dpto</Text>
               <TextInput style={isSelectedDirection ? ReprogramarEnvioStyles.input : ReprogramarEnvioStyles.inputBloq} editable={isSelectedDirection == true ? true : false}  value={pisodepto} onChangeText={(text)=>setPisoDepto(text)}></TextInput>
               <Text style={ReprogramarEnvioStyles.label}>Localidad</Text>
               <TextInput style={isSelectedDirection ? ReprogramarEnvioStyles.input : ReprogramarEnvioStyles.inputBloq} editable={isSelectedDirection == true ? true : false}  value={local} onChangeText={(text)=>setLocal(text)}></TextInput>
               <Text style={ReprogramarEnvioStyles.label}>Código Postal</Text>
               <TextInput style={isSelectedDirection ? ReprogramarEnvioStyles.input : ReprogramarEnvioStyles.inputBloq} editable={isSelectedDirection == true ? true : false}  value={cp} onChangeText={(text)=>setCP(text)}></TextInput>
               <Text style={ReprogramarEnvioStyles.label}>Descripcion</Text>
               <TextInput style={isSelectedDirection ? ReprogramarEnvioStyles.inputMultiline : ReprogramarEnvioStyles.inputMultilineBloq} editable={isSelectedDirection == true ? true : false} multiline={true} numberOfLines={4} value={descripcion} onChangeText={(text)=>setDescripcion(text)}></TextInput>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text style={ReprogramarEnvioStyles.titulo}>¿Quieres cambiar el horario?</Text>
                <CheckBox uncheckedColor='#08AFA5' checkedColor='#FF5733' checked={isSelected} onPress={()=>setIsSelected(!isSelected)}></CheckBox>
            </View>
            {
                isSelected && (
            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="calendar-outline" size={25} onPress={showDatepicker} color="#FF5733" style={ReprogramarEnvioStyles.icono}></Ionicons>
                        <Text style={ReprogramarEnvioStyles.fecha}>{moment(date).locale('es').format('L')}</Text>
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
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="time" size={25} onPress={showTimePicker} color="#FF5733" style={ReprogramarEnvioStyles.icono}></Ionicons>
                    <Text style={ReprogramarEnvioStyles.fecha}>{moment(hour).locale('es').format('LT')}</Text>
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
            <View style={{flexDirection: 'row', marginTop: '10%'}}>
                <MaterialIcons name="info" size={24} color="#FF4916" />
                <Text style={ReprogramarEnvioStyles.infoText}>Una vez enviados los datos se notificará automáticamente la {"\n"}modificación al repartidor y le llegará a su email el comprobante {"\n"}con el detalle y costo adicional del envío</Text>
            </View>
            <View style={ReprogramarEnvioStyles.botonEnviar}>
                <Button color="#08AFA5" title="Enviar" onPress={ () => updateEnvio()}></Button>
            </View>
            <Modal isVisible={isModalVisible}>
                <View style={ReprogramarEnvioStyles.modal}>
                        <View style={{flexDirection: 'row', justifyContent:'center'}}>
                            <Ionicons name="checkmark-circle" size={150} color="#08AFA5"></Ionicons>
                        </View>
                        <Text style={ReprogramarEnvioStyles.modalTextAclaracion}>ENVIO REPROGRAMADO</Text>
                        <View style={ReprogramarEnvioStyles.modalCaja}>
                        </View>
                        <View>
                            <Button color="#08AFA5" title="VOLVER" onPress={()=>props.navigation.navigate("Pedido")} />
                        </View>
                </View>
            </Modal>
        </ScrollView>
    </SafeAreaView>
    )
}

export default ReprogramarEnvioScreen