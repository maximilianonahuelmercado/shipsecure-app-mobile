import { StyleSheet } from "react-native";

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: 25,
            paddingBottom: 10,
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
            width: 155
        },
        textArea: {
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#FFF',
            marginBottom: 15,
            marginLeft: 10
        },
        checkbox:{
            marginLeft: 10,
            
        },
        labelEnvioProgramado:{
            color: '#08AFA5',
            fontWeight: 'bold',
            marginTop: 15,
        },
        botonCrearEnvio:{   
            marginTop: 40,
            marginBottom: 40,
            overflow: 'hidden',
            width: 200,
            borderRadius: 30,
            alignSelf: 'center',
        }

    })
