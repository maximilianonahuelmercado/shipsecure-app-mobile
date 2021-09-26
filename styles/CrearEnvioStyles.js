import { StyleSheet } from "react-native";

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: '10%',
            paddingBottom: '5%',
            paddingTop:100,
            backgroundColor: '#003748'
        },
        titulo:{
            padding: 20,  
            fontSize: 20,
            fontWeight: 'bold',
            color: '#FF5733'
        },
        label: {
            flex: 1,
            padding: 10,
            color: '#08AFA5',
            fontWeight: 'bold',    
        },
        input: {
            padding: 5,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#FFF',
            borderRadius: 25,
            marginBottom: 15,
            marginRight: 30,
            width: '100%'
        },
        picker: {
            backgroundColor:'#2E4B5B',
            color: '#FFF',
            marginBottom: '5%',
            width: '100%'

        },
        textArea: {
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#FFF',
            marginBottom: '5%',
            width: '100%'
        },
        labelEnvioProgramado:{
            color: '#08AFA5',
            fontWeight: 'bold',
            marginTop: 15,
        },
        botonCrearEnvio:{   
            marginTop: '5%',
            marginBottom: '5%',
            overflow: 'hidden',
            width: '80%',
            borderRadius: 30,
            alignSelf: 'center',
        },
        botonCalcular:{
            marginTop: '5%',
            marginBottom: '5%',
            overflow: 'hidden',
            width: '80%',
            borderRadius: 30,
            alignSelf: 'center',
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
            backgroundColor: '#FFF',
            width: "80%",
            height: "50%",
            alignItems: "center",
            justifyContent: "center",
        },
        modalText: {
            color: '#000',
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: '20%'
        }
    })
