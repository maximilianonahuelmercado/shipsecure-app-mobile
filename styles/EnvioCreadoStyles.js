import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: '5%',
            paddingTop:100,
            backgroundColor: '#003348'
        },
        linea:{  
            borderBottomColor: '#FF5733',
            borderBottomWidth: 1,
            marginBottom:10
        },
        label:{
            marginBottom: 30,
            color: '#FFF',
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 25
        },
        texto:{
            padding: 10,
            marginTop: 30,
            marginBottom: 50,
            color: '#FFF',
            alignSelf: 'center',
            fontSize: 15
        },
        botonRegresar: {
            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'center'
        }
    }
)