import React, { useState, useEffect } from 'react'
import { View, FlatList,TextInput, SafeAreaView, ScrollView, Text, Button, Platform } from 'react-native'
import { Avatar } from 'react-native-elements'
import { db, auth, stg} from '../database/firebase';
import * as ImagePicker  from 'expo-image-picker'
import ModificarPerfilStyles from '../styles/ModificarPerfilStyles'


const ModificarPerfilScreen = (props) => {

    const [idUsuario, setIdUsuario] = useState('')
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    
    const entityRef = db.collection('usuarios')
    /*useEffect(()=>{
        entityRef.where('email', '==', auth?.currentUser?.email).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                const user = []
                user.push({
                ...documentSnapshot.data(), 
                key: documentSnapshot.id
                
            })
            setUsuario(user)
            })   
        })
    }, [])
    */
    
    const [imageURL, setImageUrl] = useState(null);
    const [refStorage, setRefStorage] = useState('');

    useEffect(() => {
      (async () => {
        if (Platform.OS == 'android') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [6, 9],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImageUrl(result.uri);
      }
    };

    const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function (){
                resolve(xhr.response);
            };
            xhr.onerror = function(){
                reject(new TypeError('Fallo en la conexion'));
            };
            xhr.responseType = "blob";
            xhr.open("GET", imageURL, true);
            xhr.send(null);
        });
        
        const imageIdentifier = auth?.currentUser?.uid
        console.log(imageIdentifier)
        setRefStorage(imageIdentifier)
        console.log("setRefStorage: ", refStorage)
        const ref = stg.ref().child(imageIdentifier)
        ref.put(blob)
        
    }

    const updateUser = () => {
        entityRef.where('email', '==', auth?.currentUser?.email).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                entityRef.doc(documentSnapshot.data()._id).update({
                    nombre: name,
                    apellido: surname,
                    fechaNacimiento: fechaNacimiento,
                    email: email
                })
                setIdUsuario(documentSnapshot.data()._id)
            })

        })
        alert('Usuario actualizado')
        props.navigation.navigate("Home")
    }

    return (
            <SafeAreaView style={ModificarPerfilStyles.container}> 
                <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={ModificarPerfilStyles.avatar}>
                            <Avatar rounded size={200} source={{uri: imageURL ? imageURL :auth?.currentUser?.photoURL}} onPress={pickImage}></Avatar>
                        </View>
                        <View style={ModificarPerfilStyles.botonActualizar}>
                            <Button color="#08AFA5" title="Subir Imágen" onPress={uploadImage}/>
                        </View>
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Nombres</Text>
                        </View>
                        <TextInput
                                style={ModificarPerfilStyles.input}
                                value={name}
                                onChangeText={text => setName(text)}
                        />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Apellidos</Text>
                        </View>
                        <TextInput
                                style={ModificarPerfilStyles.input}
                                value={surname}
                                onChangeText={text => setSurname(text)}
                        />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Fecha de nacimiento</Text>
                        </View>
                        <TextInput
                                style={ModificarPerfilStyles.input}
                                value={fechaNacimiento}
                                onChangeText={text => setFechaNacimiento(text)}
                        />
                        <View>
                            <Text style={ModificarPerfilStyles.label}>Email</Text>
                        </View>
                            <TextInput
                                style={ModificarPerfilStyles.input}
                                value={email}
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
                        <View style={ModificarPerfilStyles.botonActualizar}>
                            <Button color="#08AFA5" title="Actualizar"
                             onPress={updateUser}></Button>
                        </View>
                </ScrollView>
            </SafeAreaView>
    )
}

export default ModificarPerfilScreen
