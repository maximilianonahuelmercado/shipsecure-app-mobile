import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: '5%',
            backgroundColor: '#003348'
        },
        inputLabelTituloReprogramarEnvio:{
            padding: 10,
            fontWeight: 'bold',
            fontSize: 20,
            color: '#08AFA5'
        },
        linea:{
            
            borderBottomColor: '#F7A583',
            borderBottomWidth: 1,
            marginBottom:10
        },
        input: {
            padding: 5,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#FFF',
            borderRadius: 25,
            marginBottom: 15,
            marginRight: 30,
            marginTop: 5
        },
        inputBloq: {
            padding: 5,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#998E8E',
            borderRadius: 25,
            marginBottom: 15,
            marginRight: 30,
            marginTop: 5
        },
        inputDateTime: {
            padding: 5,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#FFF',
            borderRadius: 25,
            marginBottom: 30,
            width: 150
        },
        inputMultiline: {
            padding: 5,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#FFF',
            marginBottom: 15,
            marginRight: 30,
            marginTop: 5
        },
        inputMultilineBloq: {
            padding: 5,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#998E8E',
            marginBottom: 15,
            marginRight: 30,
            marginTop: 5
        },
        label: {
            flex: 1,
            paddingLeft: 5,
            color: '#08AFA5',
            fontWeight: 'bold',
            marginTop: 15,
            marginBottom: 5
        },
        titulo: {
            fontSize: 15,
            color: '#08AFA5',
            fontWeight: 'bold',
            marginTop: 15
        },
        infoText:{
            fontSize: 11,
            padding: 5,
            alignContent: 'flex-start',
            alignSelf: 'center',
            color: '#FFF'
        },
        botonEnviar: {
            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'center',
            marginTop: 30,
            marginBottom: 25        
        },
        fecha:{
            marginLeft: '4%',
            color: '#FFF',
            fontSize: 20,
            fontWeight: 'bold'
        },
        icon: {
            position: 'absolute',
            right: 15,
            marginBottom: '5%',
            color: '#FFF'
        },
        modal: {
            alignSelf: 'center',
            backgroundColor: '#003348',
            width: "90%",
            height: "50%",
            alignItems: "center",
            justifyContent: "center",
        },
        modalText: {
            padding: 30,
            paddingTop: 0,
            color: '#000',
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: '20%'
        },
        modalTextAclaracion:{
            paddingLeft: 10,
            color: '#FFF',
            fontSize: 20,
            fontWeight: 'bold',
        },
        modalCaja:{
            
            alignSelf: 'flex-start',
            marginBottom: '20%'
        }
    }
)