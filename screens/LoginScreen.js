import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, ScrollView, Text, Button, TextInput, ImageBackground } from 'react-native'
import { auth } from '../database/firebase';
import LoginStyles from '../styles/LoginStyles';
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [modalLogin, setModalLogin] = useState(false);


    const image = { uri: "https://i.ibb.co/vk5CGz2/background.png" };

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error)
                setModalLogin(true)
            });
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                navigation.replace('Home');
            } else {

                navigation.canGoBack() && navigation.popToTop();
                // No user is signed in.
            }
        });

        return unsubscribe
    }, [])

    const toggleModalLogin = () => {
        setModalLogin(!modalLogin)
    }

    return (
        <SafeAreaView style={LoginStyles.container}>
            <ImageBackground source={image} style={LoginStyles.imagen}>{
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={LoginStyles.contenido}>
                        <View>
                            <Text style={LoginStyles.label}>Email</Text>
                        </View>
                        <TextInput
                            style={LoginStyles.input}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            autoCapitalize='none'
                        >

                        </TextInput>
                        <View>
                            <Text style={LoginStyles.label}>Password</Text>
                        </View>
                        <View style={LoginStyles.inputContainer}>
                            <TextInput
                                style={LoginStyles.input}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry={hidePass ? true : false}
                            />
                            <Ionicons name={hidePass ? 'eye' : 'eye-off-outline'} size={30} style={LoginStyles.icon} onPress={() => setHidePass(!hidePass)} />
                        </View>

                        <View>
                            <Text style={LoginStyles.forgotPassword} onPress={() => navigation.navigate('ReestablecerPassword')}>¿Olvidaste tu contraseña?</Text>
                        </View>
                        <View style={LoginStyles.botonIngresar}>
                            <Button color="#08AFA5" title="Ingresar" onPress={signIn} />
                        </View>
                        <View>
                            <Text style={LoginStyles.texto}>
                                ¿No tienes cuenta?<Text style={LoginStyles.toRegistro} onPress={() => navigation.navigate('Registro')}> Registrarse</Text>
                            </Text>
                        </View>
                        <Modal isVisible={modalLogin}>
                            <View style={LoginStyles.modal}>
                                <Ionicons name="sad-outline" size={150} color="#FF5733"></Ionicons>
                                <Text style={LoginStyles.modalTextCamposObligatorios}>Problema iniciando sesión{"\n"}Verifica tus credenciales</Text>
                                <View style={LoginStyles.modalCaja}>
                                </View>
                                <View>
                                    <Button color="#08AFA5" title="VOLVER" onPress={toggleModalLogin} />
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            }

            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginScreen

