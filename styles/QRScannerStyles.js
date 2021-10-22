import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: '5%',
            paddingTop:150,
            backgroundColor: '#003348'
        },
        modal: {
            alignSelf: 'center',
            backgroundColor: '#FFF',
            width: "90%",
            height: "30%",
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
        texto:{
            color: '#000',
            alignSelf: 'center',
            fontSize: 15,
            fontWeight: 'bold',
        },
        gratitud:{
            color: '#000',
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        },
        modalCaja:{
            
            alignSelf: 'flex-start',
            marginBottom: '10%'
        },        
        boton: {

            overflow: 'hidden',
            width: '80%',
            borderRadius: 30,
            alignSelf: 'center',
            marginBottom: 25
            
        }
    }
)