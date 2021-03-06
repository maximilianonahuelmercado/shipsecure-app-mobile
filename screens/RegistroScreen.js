import React, { useState } from 'react'
import { View, Button,TextInput, SafeAreaView, ScrollView, Text, Platform } from 'react-native'
import { db, auth} from '../database/firebase';
import { Ionicons } from '@expo/vector-icons'; 
import moment from 'moment'
import Modal from 'react-native-modal'
import 'moment/locale/es'
import DateTimePicker from '@react-native-community/datetimepicker'
import RegistroStyles from '../styles/RegistroStyles'

const RegistroScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [hideRePass, setHideRePass] = useState(true);

    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [modalDatos ,setModalDatos] = useState(false);
    const [modalPassword ,setModalPassword] = useState(false);



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    

      const toggleModalDatos = () => {
        setModalDatos(!modalDatos)
    }

    
    const toggleModalPassword = () => {
        setModalPassword(!modalPassword)
    }

    const entityRef = db.collection('usuarios')
    const idUsuario = (100000 + Math.floor(Math.random() * 900000)).toString()

    const register = () => {
        if(email === '' || name ==='' || surname === '' || password === ''  || repassword === '') {
            setModalDatos(true)
        }
        else{

            if(password === repassword){

                auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Logueado 
                    var user = userCredential.user;
                    user.updateProfile({
                        displayName: name,
                        photoURL: "https://i.ibb.co/jGwMwn4/Microsoft-Teams-image.png"
                    }).then(function () {
                        // Update successful. Persistimos los datos del usuario en firebase
                        entityRef.doc(idUsuario).set({
                            _id: idUsuario,
                            nombre: name,
                            apellido: surname,
                            email: email,
                            fechaNacimiento: moment(date).locale('es').format('L'),
                            alias:'',
                            esEmpleado:false,
                            puntos:0
                        })
                    }).catch(function (error) {
                        // An error happened.
                    });
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(error)
                });
            }
            else{
                setModalPassword(true)
            }
        }
    }
    return (
    <SafeAreaView style={RegistroStyles.container}> 
        <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={RegistroStyles.tituloPrincipal}>??Bienvenido!</Text>
                <View>
                    <Text style={RegistroStyles.label}>Nombre (*)</Text>
                </View>
                <TextInput
                        style={RegistroStyles.input}
                        value={name}
                        onChangeText={text => setName(text)}
                />
                <View>
                    <Text style={RegistroStyles.label}>Apellido (*)</Text>
                </View>
                <TextInput
                        style={RegistroStyles.input}
                        value={surname}
                        onChangeText={text => setSurname(text)}
                />
                <View>
                    <Text style={RegistroStyles.label}>Fecha de Nacimiento</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="calendar-outline" size={25} onPress={showDatepicker} color="#FF5733" style={RegistroStyles.icono}></Ionicons>
                    <Text style={RegistroStyles.fecha}>{moment(date).locale('es').format('L')}</Text>
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
                <View>
                    <Text style={RegistroStyles.label}>Email (*)</Text>
                </View>
                    <TextInput
                        style={RegistroStyles.input}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoCapitalize='none'
                    />  
                <View>
                    <Text style={RegistroStyles.label}>Contrase??a (*)</Text>
                </View>
                <View style={RegistroStyles.inputContainer}> 
                    <TextInput
                        style={RegistroStyles.input}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={hidePass ? true : false}
                    />
                    <Ionicons name={hidePass ? 'eye' : 'eye-off-outline'} size={30} style={RegistroStyles.icon} onPress={() => setHidePass(!hidePass)}/>
                </View>
                <View>
                    <Text style={RegistroStyles.label}>Confirmar Contrase??a (*)</Text>
                </View>
                <View style={RegistroStyles.inputContainer}> 
                    <TextInput
                        style={RegistroStyles.input}
                        value={repassword}
                        onChangeText={text => setRepassword(text)}
                        secureTextEntry={hideRePass ? true : false}
                    />
                    <Ionicons name={hideRePass ? 'eye' : 'eye-off-outline'} size={30} style={RegistroStyles.icon} onPress={() => setHideRePass(!hideRePass)}/>
                </View>
                <View style={RegistroStyles.botonRegistrarse}>
                    <Button color="#08AFA5" title="Registrarme" onPress={register} />
                </View>
                <Modal isVisible={modalDatos}>
                    <View style={RegistroStyles.modal}>
                        <Ionicons name="sad-outline" size={150} color="#FF5733"></Ionicons>
                        <Text style={RegistroStyles.modalTextCamposObligatorios}>Los campos (*) son obligatorios</Text>
                        <View style={RegistroStyles.modalCaja}>
                        </View>
                        <View>
                            <Button color="#08AFA5" title="VOLVER" onPress={toggleModalDatos} />
                        </View>
                    </View>
            </Modal>
            <Modal isVisible={modalPassword}>
                    <View style={RegistroStyles.modal}>
                        <Ionicons name="sad-outline" size={150} color="#FF5733"></Ionicons>
                        <Text style={RegistroStyles.modalTextCamposObligatorios}>Las passwords no coinciden</Text>
                        <View style={RegistroStyles.modalCaja}>
                        </View>
                        <View>
                            <Button color="#08AFA5" title="VOLVER" onPress={toggleModalPassword} />
                        </View>
                    </View>
            </Modal>
        </ScrollView>
    </SafeAreaView>
    )
}

export default RegistroScreen
