import React, { useEffect, useState, useCallback  } from 'react'
import { View } from 'react-native';
import { db, auth } from '../database/firebase';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

const ChatScreen = (navigation) => {
    const [messages, setMessages] = useState([]);
    const entityRef = db.collection('messagesRN')
    
    
    /*GiftedChat maneja sus estilos en el tag por eso no hay archivo de styles asociada a esta screen*/
    useEffect(() => {
        
        const unsubscribe = entityRef.onSnapshot((querySnapshot) => {
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
        const writes = messages.map((m) => entityRef.add(m))
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
            listViewProps={{style: {backgroundColor: '#003748'}}}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName
            }}
        />

    )
}


export default ChatScreen

