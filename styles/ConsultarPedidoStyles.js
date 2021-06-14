import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: 50,
            paddingTop:150,
            backgroundColor: '#003748'
        },
        avatar: {
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 50
        },
        saludo:{
            padding:0,
            marginBottom: 50,
            color: '#FFF',
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 25
        },
        inputLabelCodigo:{
            padding: 10,
            paddingBottom: 15,
            color: '#FFF',
            fontWeight: 'bold',
            fontSize:20
        },
        inputLabelChatBot:{
            padding: 10, 
            color: '#FFF',
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        input: {

            padding: 10,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#FFF',
            borderRadius: 25,
            marginBottom: 15,
            
        },
        botonConsultar: {

            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'flex-end',
            marginBottom: 150
        },
        botonChatBot: {

            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'center',
            
        }
    }
)