import { StyleSheet } from "react-native";
import { color } from "react-native-elements/dist/helpers";

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: '5%',
            paddingBottom: 10,
            paddingTop:100,
            backgroundColor: '#003348'
        },
        tituloPrincipal:{
            padding: 20,
            fontSize: 35,
            fontWeight: 'bold',
            color: "#FFF",
            alignSelf: 'center'
        },
        toRegistro:{
            padding: 20,  
            fontSize: 15,
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
            alignSelf: 'flex-start',
            padding: 5,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#FFF',
            borderRadius: 25,
            marginBottom: 15,
            marginRight: 30,
            width: '100%'
        },
        botonRegistrarse:{   
            marginTop: 20,
            overflow: 'hidden',
            width: '50%',
            borderRadius: 30,
            alignSelf: 'center', 
        },
        texto:{
            padding: 20,  
            fontSize: 15,
            fontWeight: 'bold',
            color: '#FFF',
            alignSelf: 'center'
        },
        icono:{
            paddingLeft: 5
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
        inputContainer:{
            justifyContent:'center'
        }
    })
