import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: 50,
            paddingTop:80,
            backgroundColor: '#003748'
        },
        inputLabelTituloPedidoID:{
            padding: 10,
            paddingBottom:0,
            marginBottom:0,
            fontWeight: 'bold',
            fontSize: 20,
            color: '#FFF'
        },
        inputLabelPedidoId:{
            padding: 10,
            paddingTop:0,
            marginBottom: 5,
            fontWeight: 'bold',
            fontSize: 25,
            color: '#08AFA5'
        },
        linea:{
            
            borderBottomColor: '#FF5733',
            borderBottomWidth: 1,
            marginBottom:10
        },
        inputLabelTitulo:{
            padding: 10,
            paddingBottom:0,
            marginBottom:0,
            fontWeight: 'bold',
            fontSize: 20,
            color: '#08AFA5'
        },
        inputLabelDatos:{
            padding:10,
            paddingTop:0,
            marginBottom:10,
            fontSize: 15,
            color: '#FFF'
        },
        botonChatBot: {

            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'center',
            
        }
    }
)