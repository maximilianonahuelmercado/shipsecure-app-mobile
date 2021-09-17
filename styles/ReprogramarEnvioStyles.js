import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: '5%',
            paddingTop:80,
            backgroundColor: '#003748'
        },
        inputLabelTituloReprogramarEnvio:{
            padding: 10,
            marginBottom:5,
            fontWeight: 'bold',
            fontSize: 20,
            color: '#08AFA5',
            marginLeft: 5
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
            paddingLeft: 5,
            color: '#FFF'
        },
        botonEnviar: {
            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'center',
            marginTop: 30,
            marginBottom: 25        
        }
    }
)