import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
    container: {
        flex: 1,
        padding: '2%',
        backgroundColor: '#003348'
    },
    texto:{
        color: '#FFF',
        fontSize: 25,
        marginBottom: '2%'
    },
    inputLabelTitulo:{
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
    label:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#08AFA5'
    },
        botonChatBot: {

            overflow: 'hidden',
            width: 150,
            borderRadius: 30,
            alignSelf: 'center', 
            marginBottom: 10
        }
    }
)