import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, ScrollView, Text, Button, TextInput } from 'react-native'
import { auth } from '../database/firebase';
import LoginStyles from '../styles/LoginStyles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage)
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

    return (
        <SafeAreaView style={LoginStyles.container}> 
            <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={LoginStyles.tituloPrincipal}>ShipSecure</Text>
                    </View>
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
                    <TextInput
                        style={LoginStyles.input}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    >
                    </TextInput>
                    <View>
                        <Text style={LoginStyles.forgotPassword} onPress={()=> navigation.navigate('ReestablecerPassword')}>¿Olvidaste tu contraseña?</Text>
                    </View>
                    <View style={LoginStyles.botonIngresar}>
                        <Button color="#08AFA5" title="Ingresar" onPress={signIn} />
                    </View>
                    <View>
                        <Text style={LoginStyles.texto}>
                            ¿No tienes cuenta?<Text style={LoginStyles.toRegistro} onPress={()=>navigation.navigate('Registro')}> Registrarse</Text>
                        </Text>      
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen

