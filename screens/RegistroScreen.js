import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth } from '../database/firebase';
import LoginStyles from '../styles/LoginStyles';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageUrl] = useState('');
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                user.updateProfile({
                    displayName: name,
                    photoURL: imageURL ? imageURL : "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
                }).then(function () {
                    // Update successful.
                }).catch(function (error) {
                    // An error happened.
                });
                // ...
                navigation.popToTop();
            })
            .catch((error) => {

                var errorMessage = error.message;
                alert(errorMessage)
            });
    }
    return (
    <SafeAreaView style={LoginStyles.container}> 
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Input
                    placeholder="Enter your name"
                    label="Name"
                    leftIcon={{ type: 'material', name: 'badge' }}
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input
                    placeholder="Enter your email"
                    label="Email"
                    leftIcon={{ type: 'material', name: 'email' }}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder="Enter your password"
                    label="Password"
                    leftIcon={{ type: 'material', name: 'lock' }}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <Input
                    placeholder="Enter your image Url"
                    label="Profile Picture"
                    leftIcon={{ type: 'material', name: 'face' }}
                    value={imageURL}
                    onChangeText={text => setImageUrl(text)}
                />
                <View style={LoginStyles.botonCrearEnvio}>
                    <Button color="#08AFA5" title="Registrame" onPress={register} style={styles.button} />
                </View>
                

            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default RegisterScreen
