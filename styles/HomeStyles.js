import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: '5%',
            backgroundColor: '#003748'
        },
        avatar: {
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 30
        },
        saludo:{
            padding:0,
            marginBottom: 50,
            color: '#FFF',
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 25
        },
        pregunta:{
            padding:0,
            marginBottom: 50,
            color: '#FF5A33',
            alignSelf: 'center',
            fontSize: 15,
            fontWeight: 'bold'
        },
        inputLabelCodigo:{
            padding: 10, 
            color: '#FFF',
            fontWeight: 'bold'
        },
        labelTexto:{
            padding: 10, 
            color: '#FFF',
            alignSelf: 'flex-start'
        },
        inputLabelChatBot:{
            padding: 10, 
            color: '#FFF',
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: 15
        },
        botonChatBot: {

            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'center', 
            marginBottom: 10
        },
        labelTextoSeguirEnvio:{
            padding: 10, 
            color: '#FFF',
            marginRight: 30
        },
        labelTextoCrearPedido:{
            padding: 10, 
            color: '#FFF',
            marginLeft: 30
        },
        labelTextoEntregarPedido:{
            marginTop: 10,
            marginBottom: 5,
            color: '#FFF'
        }
    }
)