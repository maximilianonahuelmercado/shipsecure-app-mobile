import React, { useState, useEffect } from 'react'
import { View, FlatList,TextInput, SafeAreaView, ScrollView, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import { db, auth} from '../database/firebase';
import ModificarPerfilStyles from '../styles/ModificarPerfilStyles'

const ModificarPerfilScreen = (props) => {

    const [usuario, setUsuario] = useState([])
    const [email, setEmail] = useState(auth?.currentUser?.email);
    const [name, setName] = useState(auth?.currentUser?.displayName);
    const [surname, setSurname] = useState(auth?.currentUser?.displaySurname);
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [imageURL, setImageUrl] = useState('');
    
    const entityRef = db.collection('usuarios')
    useEffect(()=>{
        entityRef.where('email', '==', auth?.currentUser?.email).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                const user = []
                user.push({
                ...documentSnapshot.data(),
                
            })
            console.log(documentSnapshot.data())
            setUsuario(user)
            })   
        })
    }, [])

    return (
        <FlatList style={ModificarPerfilStyles.container} data={usuario} renderItem={({item}) => (
            <SafeAreaView> 
                <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={ModificarPerfilStyles.avatar}>
                            <Avatar rounded size={150} source={{uri: auth?.currentUser?.photoURL}}></Avatar>
                        </View>
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Nombres</Text>
                        </View>
                        <TextInput
                                style={ModificarPerfilStyles.input}
                                value={item.nombre}
                                onChangeText={text => setName(text)}
                        />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Apellidos</Text>
                        </View>
                        <TextInput
                                style={ModificarPerfilStyles.input}
                                value={item.apellido}
                                onChangeText={text => setSurname(text)}
                        />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Fecha de nacimiento</Text>
                        </View>
                        <TextInput
                                style={ModificarPerfilStyles.input}
                                value={item.fechaNacimiento}
                                onChangeText={text => setFechaNacimiento(text)}
                        />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Email</Text>
                        </View>
                            <TextInput
                                style={ModificarPerfilStyles.input}
                                value={item.email}
                                onChangeText={text => setEmail(text)}
                                autoCapitalize='none'
                            />  
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Contraseña</Text>
                        </View>
                            <TextInput
                                style={ModificarPerfilStyles.input}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry
                            />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Confirmar Contraseña</Text>
                        </View>
                            <TextInput
                                style={ModificarPerfilStyles.input}
                                value={repassword}
                                onChangeText={text => setRepassword(text)}
                                secureTextEntry
                            />
                </ScrollView>
            </SafeAreaView>
            )}>
        </FlatList>
    )
}

export default ModificarPerfilScreen
