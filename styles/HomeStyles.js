import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: 50,
            paddingTop:80,
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
        pregunta:{
            padding:0,
            marginBottom: 50,
            color: '#FF5733',
            alignSelf: 'center',
            fontSize: 15
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
        input: {

            padding: 10,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#FFF',
            borderRadius: 25,
            marginBottom: 15,
            
        },
        botonSeguirEnvio: {
            padding: 10,
            marginBottom: 30,
            marginRight: 50,
        },
        botonCrearEnvio: {
            
            padding: 10,
            marginBottom: 30,
            marginLeft: 50
        },
        botonEntregarPedido: {

            paddingLeft:20,
            marginBottom: 30,
            alignSelf: 'center'
        },
        inputLabelChatBot:{
            padding: 10, 
            color: '#FFF',
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        botonChatBot: {

            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'center'
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
            padding: 10, 
            color: '#FFF',
            marginLeft: 30,
            alignSelf: 'center'
        }
    }
)