import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, ScrollView, Text, Button, TextInput } from 'react-native'
import { auth } from '../database/firebase';
import ReestablecerPasswordStyles from '../styles/ReestablecerPasswordStyles';

const ReestablecerPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    
    const forgotPassword = (email) => {
        auth.sendPasswordResetEmail(email)
        navigation.replace('Login')
        alert('Se ha enviado un mail para re establecer la contraseña')
      }

    return (
        <SafeAreaView style={ReestablecerPasswordStyles.container}> 
            <ScrollView showsVerticalScrollIndicator={false}>
                  
                    <Text style={ReestablecerPasswordStyles.label}>Email</Text>
                    <TextInput
                        style={ReestablecerPasswordStyles.input}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoCapitalize='none'
                    >
                    
                    </TextInput>
                    
                    <View style={ReestablecerPasswordStyles.botonEnviar}>
                        <Button color="#08AFA5" title="Enviar Email" onPress={() => forgotPassword(email)} />
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ReestablecerPasswordScreen

