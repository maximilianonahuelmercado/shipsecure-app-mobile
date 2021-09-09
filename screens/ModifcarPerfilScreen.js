import React, { useState } from 'react'
import { View,TextInput, SafeAreaView, ScrollView, Text, Button, Alert } from 'react-native'
import {CheckBox} from 'react-native-elements'
import { db, auth} from '../database/firebase';
import * as firebase from 'firebase'
import ModificarPerfilStyles from '../styles/ModificarPerfilStyles'


const ModificarPerfilScreen = (props) => {

    const [email, setEmail] = useState(auth?.currentUser?.email);
    const [name, setName] = useState(auth?.currentUser?.displayName);
    const [surname, setSurname] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [confRepassword, setConfRepassword] = useState('');
    const [isSelected, setSelection] = useState(false)

    const entityRef = db.collection('usuarios')
    

    const updateUser = () => {
        entityRef.where('email', '==', auth?.currentUser?.email).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                entityRef.doc(documentSnapshot.data()._id).update({
                    nombre: name,
                    apellido: surname,
                    fechaNacimiento: fechaNacimiento,
                    email: email
                })
            })
            
        })
        console.log(password, email, repassword)
        alert('Datos Actualizados, por favor vuelva a ingresar a la aplicación')
    }

    return (
            <SafeAreaView style={ModificarPerfilStyles.container}> 
                <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop:'10%'}}>
                            <Text style={ModificarPerfilStyles.titulo}>¿Deseas modificar tus datos?</Text>
                            <CheckBox uncheckedColor='#08AFA5' checkedColor='#FF5733' checked={isSelected} onPress={()=>setSelection(!isSelected)}></CheckBox>
                        </View>
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Nombres</Text>
                        </View>
                        <TextInput
                                style={isSelected == true ? ModificarPerfilStyles.input : ModificarPerfilStyles.inputBlocked}
                                value={name}
                                onChangeText={text => setName(text)}
                                editable={isSelected == true ? true : false}
                        />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Apellidos</Text>
                        </View>
                        <TextInput
                                style={isSelected == true ? ModificarPerfilStyles.input : ModificarPerfilStyles.inputBlocked}
                                value={surname}
                                onChangeText={text => setSurname(text)}
                                editable={isSelected == true ? true : false}
                        />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Fecha de nacimiento</Text>
                        </View>
                        <TextInput
                                style={isSelected == true ? ModificarPerfilStyles.input : ModificarPerfilStyles.inputBlocked}
                                value={fechaNacimiento}
                                onChangeText={text => setFechaNacimiento(text)}
                                editable={isSelected == true ? true : false}
                        />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Email</Text>
                        </View>
                            <TextInput
                                style={isSelected == true ? ModificarPerfilStyles.input : ModificarPerfilStyles.inputBlocked}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                editable={isSelected == true ? true : false}
                                autoCapitalize='none'
                            />  
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Contraseña Actual</Text>
                        </View>
                            <TextInput
                                style={isSelected == true ? ModificarPerfilStyles.input : ModificarPerfilStyles.inputBlocked}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                editable={isSelected == true ? true : false}
                                secureTextEntry
                            />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Nueva Contraseña</Text>
                        </View>
                            <TextInput
                                style={isSelected == true ? ModificarPerfilStyles.input : ModificarPerfilStyles.inputBlocked}
                                value={repassword}
                                onChangeText={text => setRepassword(text)}
                                editable={isSelected == true ? true : false}
                                secureTextEntry
                            />
                                                    <View>
                            <Text style={ModificarPerfilStyles.label}>Confirmar Nueva Contraseña</Text>
                        </View>
                            <TextInput
                                style={isSelected == true ? ModificarPerfilStyles.input : ModificarPerfilStyles.inputBlocked}
                                value={confRepassword}
                                onChangeText={text => setConfRepassword(text)}
                                editable={isSelected == true ? true : false}
                                secureTextEntry
                            />
                        <View style={ModificarPerfilStyles.botonActualizar}>
                            <Button color="#08AFA5" title="Actualizar"
                             onPress={updateUser}></Button>
                        </View>
                </ScrollView>
            </SafeAreaView>
    )
}

export default ModificarPerfilScreen
