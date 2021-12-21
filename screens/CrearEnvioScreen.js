import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, SafeAreaView} from 'react-native'
import CrearEnvioStyles from '../styles/CrearEnvioStyles'
import {CheckBox} from 'react-native-elements'
import { Button } from 'react-native';
import { auth, rt, db }  from '../database/firebase'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import Modal from 'react-native-modal'
import moment from 'moment'
import 'moment/locale/es'
import * as region from '../assets/constants/regiones.json'
import * as costos from '../assets/constants/precios.json'

const CrearEnvioScreen = (props) => {

    const entityRef = db.collection('envios')
    const usuariosRef = db.collection('usuarios')
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
    const [precio, setPrecio] = useState(0.00)
    const [date, setDate] = useState(new Date(Date.now() + (5 * 86400000)));
    const [hour, setHour] = useState(new Date(Date.now()))
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [flag, setFlag] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalDatos ,setModalDatos] = useState(false);
    //const [nivel, setNivel] = useState(0);
    const [puntos, setPuntos]  = useState(0);
    const [id, setId] = useState("");
    

   /* useEffect(()=>{
        usuariosRef.where("email", "==", email).onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
               const nvl = documentSnapshot.data().nivel
               const ptos = documentSnapshot.data().puntos
               const idUsuario = documentSnapshot.data()._id
               setNivel(nvl)
               setPuntos(ptos)
               setId(idUsuario)
            })
        })
    }, [])*/


    useEffect(()=>{

    },[isSelected])

    useEffect(()=>{

    },[precio])

    useEffect(()=>{
        console.log(puntos)
    },[puntos])

    useEffect(()=>{

    }, [email])


    const toggleModal = () => {
      setModalVisible(!isModalVisible);
      if(!isModalVisible){
        return calcularEnvio()
      }
    };

    const toggleModalDatos = () => {
        setModalDatos(!modalDatos)
    }

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
          
        usuariosRef.where("email", "==", email).onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
               //const nvl = documentSnapshot.data().nivel
               const ptos = documentSnapshot.data().puntos
               const idUsuario = documentSnapshot.data()._id
               //setNivel(nvl)
               setPuntos(ptos)
               setId(idUsuario)
            })
        })
      })
    
     const calcularEnvio = () => {

       /* usuariosRef.where("email", "==", email).onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
               //const nvl = documentSnapshot.data().nivel
               const ptos = documentSnapshot.data().puntos
               const idUsuario = documentSnapshot.data()._id
               //setNivel(nvl)
               setPuntos(ptos)
               setId(idUsuario)
            })
        })*/

        var pesos = 0.00
        /*Calculo costos de caja en base al peso*/
        if(peso >= 30000){
            pesos += costos.cajaGrande
        }else if(peso >=15000){
            pesos += costos.cajaMediana
        }
        else{
            pesos += costos.cajaChica
        }
        /*Calculo costes de region*/
        if(region[provincia] === "R1"){
            pesos = pesos + costos.R1
        }
        else if(region[provincia] === "R2"){
            pesos = pesos + costos.R2
        }
        else if(region[provincia] === "R3"){
            pesos = pesos + costos.R3
        }
        else if(region[provincia] === "R4"){
            pesos = pesos + costos.R4
        }
        else{
            pesos = pesos + costos.R5
        }
        /*Calculo descuento en base a los puntos*/
        var descuento = 0.00
        if(puntos < 15){
            descuento = pesos * 0.05
        }
        else if(puntos < 35)
        {
            descuento = pesos * 0.10
        }
        else if(puntos < 55)
        {
            descuento = pesos * 0.15
        }
        else if(puntos < 75)
        {
            descuento = pesos * 0.20
        }
        else if(puntos < 90)
        {
            descuento = pesos * 0.30
        }
        else if(puntos < 99)
        {
            descuento = pesos * 0.40
        }
        else
        {
            descuento = pesos * 0.50
        }
        /*Calculo si es reprogramado*/
        if (isSelected){

            pesos = pesos + costos.precioProgramado - descuento
        }
        else{
            pesos = pesos - descuento
        }
       setPrecio(pesos)
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
        calcularEnvio()
        //vaidacion previa de campos no nulos
        if( nombre === '' || apellido === '' || dni === '' || direccion === '' || localidad === '' || codigoPostal === '' || provincia === '' || peso === '' || temperatura === ''){
            setModalDatos(true)
        }
        else{
            //generamos un random de 6 digitos para el id de envio
            //const idDoc = (100000 + Math.floor(Math.random() * 900000)).toString()
            //Para test rapido
            const idDoc = "700004"
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
                observaciones: observaciones ? observaciones : "N/A",
                fechaEntrega: moment(date).locale('es').format('L'),
                horaEntrega: flag ? moment(hour).locale('es').format('LT') : "9:00 - 20:00",
                peso: parseInt(peso),
                temperatura: parseInt(temperatura),
                costo: precio,
                //estos campos seran necesarios luego para asignar un repartidor, una smartbox
                usuarioCreado: false,
                idRepartidor: "repartidor1@gmail.com",
            })
            rt.ref('/envio').update({
                idQR: idDoc,
                puerta:true,
                temperatura: parseInt(temperatura)
            })

            /*Agrego puntos al usuario*/
            usuariosRef.doc(id).update({
                puntos: (puntos + 5) > 100 ? 100 : (puntos + 5),
                //nivel: (puntos + 5) < 15 ? 1 :  (puntos + 5) < 35 ? 2 : (puntos + 5) < 55 ? 3 : (puntos + 5) < 75 ? 4 : (puntos + 5) < 90 ? 5 : (puntos + 5) < 99 ? 6 : 7
            })
            props.navigation.navigate("EnvioCreado")
        }
     }

    return (
    //Usar un safeArea antes de cada scrollview
     <SafeAreaView style={CrearEnvioStyles.container}> 
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <Text style={CrearEnvioStyles.titulo}>DATOS DE CONTACTO</Text>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Nombres (*)</Text>
                <TextInput style={CrearEnvioStyles.input} value={nombre} onChangeText={(text)=>setNombre(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Apellidos (*)</Text>
                <TextInput style={CrearEnvioStyles.input} value={apellido} onChangeText={(text)=>setApellido(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>DNI (*)</Text>
                <TextInput style={CrearEnvioStyles.input} placeholderTextColor="#687D87" value={dni} onChangeText={(text)=>setDNI(text)}></TextInput>     
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Email (*)</Text>
                <TextInput style={CrearEnvioStyles.input} value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.titulo}>DATOS DE ENVÍO</Text>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Dirección (*)</Text>
                <TextInput style={CrearEnvioStyles.input} value={direccion} onChangeText={(text)=>setDireccion(text)}></TextInput> 
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Piso/Departamento</Text>
                <TextInput style={CrearEnvioStyles.input} value={piso} onChangeText={(text)=>setPiso(text)}></TextInput>
            </View>
          
            <View>
                <Text style={CrearEnvioStyles.label}>Código Postal (*)</Text>
                <TextInput style={CrearEnvioStyles.input} autoCompleteType={'postal-code'} value={codigoPostal} onChangeText={(text)=>setCodigoPostal(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Localidad (*)</Text>
                <TextInput style={CrearEnvioStyles.input} value={localidad} onChangeText={(text)=>setLocalidad(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Provincia (*)</Text>
                <Picker  
                    style={CrearEnvioStyles.picker}
                    selectedValue={provincia}    
                    onValueChange={(itemValue, itemIndex) =>
                    setProvincia(itemValue)
                }>
                     <Picker.Item label="" value="" />
                    <Picker.Item label="Buenos Aires" value="Buenos Aires" />
                    <Picker.Item label="Catamarca" value="Catamarca" />
                    <Picker.Item label="Chaco" value="Chaco" />
                    <Picker.Item label="Chubut" value="Chubut" />
                    <Picker.Item label="Córdoba" value="Córdoba" />
                    <Picker.Item label="Corrientes" value="Corrientes" />
                    <Picker.Item label="Entre Ríos" value="Entre Ríos" />
                    <Picker.Item label="Formosa" value="Formosa" />
                    <Picker.Item label="Jujuy" value="Jujuy" />
                    <Picker.Item label="La Pampa" value="La Pampa" />
                    <Picker.Item label="La Rioja" value="La Rioja" />
                    <Picker.Item label="Mendoza" value="Mendoza" />
                    <Picker.Item label="Misiones" value="Misiones" />
                    <Picker.Item label="Neuquén" value="Neuquén" />
                    <Picker.Item label="Río Negro" value="Río Negro" />
                    <Picker.Item label="Salta" value="Salta" />
                    <Picker.Item label="San Juan" value="San Juan" />
                    <Picker.Item label="San Luis" value="San Luis" />
                    <Picker.Item label="Santa Cruz" value="Santa Cruz" />
                    <Picker.Item label="Santa Fe" value="Santa Fe" />
                    <Picker.Item label="Santiago del Estero" value="Santiago del Estero" />
                    <Picker.Item label="Tierra del Fuego" value="Tierra del Fuego" />
                    <Picker.Item label="Tucumán" value="Tucumán" />
                </Picker>
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
                        <Text style={CrearEnvioStyles.fecha}>{moment(date).locale('es').format('L')}</Text>
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
                    <Text style={CrearEnvioStyles.fecha}>{moment(hour).locale('es').format('LT')}</Text>
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
                <Text style={CrearEnvioStyles.label}>Peso (en g) (*)</Text>
                <TextInput style={CrearEnvioStyles.input} value={peso} onChangeText={(text)=>setPeso(text)}></TextInput>
            </View>
            <View>
                <Text style={CrearEnvioStyles.label}>Temperatura (en C°) (*)</Text>
                <TextInput style={CrearEnvioStyles.input} value={temperatura} onChangeText={(text)=>setTemperatura(text)}></TextInput>
            </View>
            <View  style={CrearEnvioStyles.botonCalcular}>
                <Button color="#08AFA5" title="CALCULAR COSTO DE ENVÍO" onPress={ toggleModal }></Button>
            </View>
            <Modal isVisible={isModalVisible}>
                <View style={CrearEnvioStyles.modal}>
                    <Ionicons name="card" size={150} color="#08AFA5"></Ionicons>
                    <View style={CrearEnvioStyles.modalCaja}>
                    </View>
                    <Text style={CrearEnvioStyles.modalText}>El precio es de {precio}.00$ ARS</Text>
                    <Text style={CrearEnvioStyles.modalTextAclaracion}>(*)En caso de tener descuento se aplica sobre el precio final</Text>
                    <View>
                        <Button color="#08AFA5" title="VOLVER" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
            <View style={CrearEnvioStyles.botonCrearEnvio}>
                <Button color="#08AFA5"  title="CONFIRMAR ENVÍO" onPress={ () => addEnvio()}></Button>
            </View>
            <Modal isVisible={modalDatos}>
                <View style={CrearEnvioStyles.modal}>
                    <Ionicons name="sad-outline" size={150} color="#FF5733"></Ionicons>
                    <Text style={CrearEnvioStyles.modalTextCamposObligatorios}>Los campos (*) son obligatorios</Text>
                    <View style={CrearEnvioStyles.modalCaja}>
                    </View>
                    <View>
                        <Button color="#08AFA5" title="VOLVER" onPress={toggleModalDatos} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    </SafeAreaView>
    )
}

export default CrearEnvioScreen