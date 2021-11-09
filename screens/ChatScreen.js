import React, { useEffect, useState, useCallback  } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { db, auth, rt } from '../database/firebase';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { Ionicons } from '@expo/vector-icons'

const ChatScreen = (props) => {
    const [messages, setMessages] = useState([]);
    const messagesRef = db.collection('messagesRN')
    //const idPedido = (props.route.params.idPedido).toString()
    const idPedido = props.route.params.idPedido
    const emailUsuario = props.route.params.email

    /*GiftedChat maneja sus estilos en el tag por eso no hay archivo de styles asociada a esta screen*/
    useEffect(() => {
        console.log(emailUsuario)
        if(emailUsuario === auth?.currentUser?.email){
            rt.ref('/notificacion').update({
            mensajeRepartidor : true
            })
        }
        else{
            rt.ref('/notificacion').update({
            mensajeUsuario : true
            })
        }
       

        const unsubscribe = messagesRef.where("user.idPedido", "==", idPedido).onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function handleSend(messages) {
        const writes = messages.map((m) => messagesRef.add(m))
        await Promise.all(writes)
    }



    const renderBubble = (props) => {
        //Add the extra styles via containerStyle
       return <Bubble {...props} textStyle={{left:{color:'#FFF'}}} wrapperStyle={{right:{backgroundColor: '#08AFA5'}, left:{backgroundColor: '#FF5733'}}}/>
     }

    return (
        
            <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={handleSend}
            renderBubble={renderBubble}
            placeholder="Escribe tu mensaje aquí..."
            listViewProps={{style: {backgroundColor: '#003348'}}}
            renderSend={(props) => {
                return(
                    <Send {...props}>
                        <Ionicons name="md-caret-forward-outline" style={{marginRight: '3%', paddingBottom: '2%'}} size={40} color="#003348" ></Ionicons>
                    </Send>            
                )
            }}
            user={{
                _id: auth?.currentUser?.email ,
                name: auth?.currentUser?.displayName,
                idPedido: idPedido 
            }}
        />

    )
}


export default ChatScreen

