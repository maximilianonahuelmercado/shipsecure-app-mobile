import React, { useEffect, useState } from 'react'
import { View,TextInput, SafeAreaView, ScrollView, Text, Button, Alert } from 'react-native'
import {CheckBox} from 'react-native-elements'
import { db, auth} from '../database/firebase';
import { Ionicons } from '@expo/vector-icons';
import ModificarPerfilStyles from '../styles/ModificarPerfilStyles'


const ModificarPerfilScreen = ({navigation}) => {

    const [usuario, setUsuario] = useState([{}])
    const [alias, setAlias] = useState("")
    const [hidePass, setHidePass] = useState(true);
    const [hideRePass, setHideRePass] = useState(true);
    const [repassword, setRepassword] = useState('');
    const [confRepassword, setConfRepassword] = useState('');
    const [isSelected, setSelection] = useState(false)


    const entityRef = db.collection("usuarios")
    


    //Cambiar el displayName del auth user a un ALIAS en firestore!


   const updateUser = () =>  {
        if(isSelected == true){
            if(repassword === confRepassword){
                auth.currentUser.updatePassword(repassword).then(function (){
                    auth.signOut().then(()=>{  
                        navigation.navigate("Home")
                        alert('La contraseña ha sido actualizada por favor volver a ingresar a la aplicacion')
                    })
                }).catch((error) => {
                    alert(error)

                } )
            }
            else{
                alert('Las passwords no coinciden!')
            }
        }     
        if(alias){
            console.log(usuario._id)
            entityRef.doc(usuario._id).update({alias: alias}).then(()=>{console.log('Se actualizo el Alias')})
        }
        navigation.navigate("Home")
    }

    useEffect (() => {
        entityRef.where('email', '==', auth?.currentUser?.email).get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    const users = {
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    }
                    setUsuario(users)
                })         
            })  
    }, [])

    return (
            <SafeAreaView style={ModificarPerfilStyles.container}> 
                <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Nombre</Text>
                        </View>
                        <Text style={ModificarPerfilStyles.texto}>{usuario.nombre}</Text>
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Apellidos</Text>
                        </View>
                        <Text style={ModificarPerfilStyles.texto}>{usuario.apellido}</Text>
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Email</Text>
                        </View>
                        <Text style={ModificarPerfilStyles.texto}>{usuario.email}</Text>
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Alias</Text>
                        </View>
                            <TextInput
                                style={ModificarPerfilStyles.input}
                                value={alias}
                                onChangeText={text => setAlias(text)}
                            />
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <Text style={ModificarPerfilStyles.titulo}>¿Deseas modificar tu contraseña?</Text>
                            <CheckBox uncheckedColor='#08AFA5' checkedColor='#FF5733' checked={isSelected} onPress={()=>setSelection(!isSelected)}></CheckBox>
                        </View>
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Nueva Contraseña</Text>
                        </View>
                        <View style={ModificarPerfilStyles.inputContainer}>
                            <TextInput
                                style={isSelected == true ? ModificarPerfilStyles.input : ModificarPerfilStyles.inputBlocked}
                                value={repassword}
                                onChangeText={text => setRepassword(text)}
                                editable={isSelected == true ? true : false}
                                secureTextEntry={hidePass ? true : false}
                            />
                            <Ionicons name={hidePass ? 'eye' : 'eye-off-outline'} size={30} style={ModificarPerfilStyles.icon} onPress={() => setHidePass(!hidePass)}/>
                        </View>
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Confirmar Nueva Contraseña</Text>
                        </View>
                        <View style={ModificarPerfilStyles.inputContainer}>
                            <TextInput
                                style={isSelected == true ? ModificarPerfilStyles.input : ModificarPerfilStyles.inputBlocked}
                                value={confRepassword}
                                onChangeText={text => setConfRepassword(text)}
                                editable={isSelected == true ? true : false}
                                secureTextEntry={hideRePass ? true : false}

                            />
                            <Ionicons name={hideRePass ? 'eye' : 'eye-off-outline'} size={30} style={ModificarPerfilStyles.icon} onPress={() => setHideRePass(!hideRePass)}/>
                        </View>
                        <View style={ModificarPerfilStyles.botonActualizar}>
                            <Button color="#08AFA5" title="Actualizar"
                             onPress={updateUser}></Button>
                        </View>
                </ScrollView>
            </SafeAreaView>
    )
}

export default ModificarPerfilScreen
