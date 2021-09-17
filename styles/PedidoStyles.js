import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: '5%',
            paddingTop:80,
            backgroundColor: '#003748'
        },
        inputLabelTituloPedidoID:{
            padding: 10,
            paddingBottom:0,
            marginBottom:0,
            fontWeight: 'bold',
            fontSize: 20,
            color: '#08AFA5'
        },
        inputLabelPedidoId:{
            padding: 10,
            paddingTop:0,
            marginBottom: 5,
            fontWeight: 'bold',
            fontSize: 25,
            color: '#FFF'
        },
        linea:{
            
            borderBottomColor: '#F7A583',
            borderBottomWidth: 1,
            marginBottom:10
        },
        inputLabelTitulo:{
            padding: 10,
            paddingBottom:0,
            marginBottom:0,
            fontWeight: 'bold',
            fontSize: 15,
            color: '#08AFA5'
        },
        inputLabelDatos:{
            padding:10,
            paddingTop:0,
            marginBottom:10,
            fontSize: 15,
            color: '#FFF'
        },
        botonMapa: {

            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'center',
            marginBottom: 25
            
        }
    }
)