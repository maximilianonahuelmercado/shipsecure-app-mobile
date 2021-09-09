import React, { useState } from 'react'
import { View, Button,TextInput, SafeAreaView, ScrollView, Text } from 'react-native'
import { db, auth} from '../database/firebase';
import RegistroStyles from '../styles/RegistroStyles'

const RegistroScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [imageURL, setImageUrl] = useState('');

    const entityRef = db.collection('usuarios')
    const idUsuario = (100000 + Math.floor(Math.random() * 900000)).toString()

    const register = () => {
        if(email === '' || name ==='' || surname === '' || password === ''  || repassword === '') {
            alert('Todos los campos son obligatorios')
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
                            fechaNacimiento: ''
                        })
                    }).catch(function (error) {
                        // An error happened.
                    });
                    auth.signOut().then(() => {
                        // Sign-out successful.
                        navigation.replace('Login')
                        alert('Cuenta creada con éxito, ingresa con tus datos')
                    }).catch((error) => {
                        // An error happened.
                    });
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    alert(errorMessage)
                });

            }
            else{
                alert('Las passwords no coinciden')
            }
        }
    }
    return (
    <SafeAreaView style={RegistroStyles.container}> 
        <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={RegistroStyles.tituloPrincipal}>¡Bienvenido!</Text>
                <View>
                    <Text style={RegistroStyles.label}>Nombre</Text>
                </View>
                <TextInput
                        style={RegistroStyles.input}
                        value={name}
                        onChangeText={text => setName(text)}
                />
                <View>
                    <Text style={RegistroStyles.label}>Apellido</Text>
                </View>
                <TextInput
                        style={RegistroStyles.input}
                        value={surname}
                        onChangeText={text => setSurname(text)}
                />
                <View>
                    <Text style={RegistroStyles.label}>Email</Text>
                </View>
                    <TextInput
                        style={RegistroStyles.input}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoCapitalize='none'
                    />  
                <View>
                    <Text style={RegistroStyles.label}>Contraseña</Text>
                </View>
                    <TextInput
                        style={RegistroStyles.input}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                                <View>
                    <Text style={RegistroStyles.label}>Confirmar Contraseña</Text>
                </View>
                    <TextInput
                        style={RegistroStyles.input}
                        value={repassword}
                        onChangeText={text => setRepassword(text)}
                        secureTextEntry
                    />
                <View style={RegistroStyles.botonRegistrarse}>
                    <Button color="#08AFA5" title="Registrarme" onPress={register} />
                </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default RegistroScreen
