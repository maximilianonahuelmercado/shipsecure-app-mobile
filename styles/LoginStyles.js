import { StyleSheet } from "react-native";

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: 25,
            paddingBottom: 10,
            paddingTop:100,
            backgroundColor: '#003348'
        },
        tituloPrincipal:{
            marginTop:50,
            padding: 20,
            fontSize: 35,
            fontWeight: 'bold',
            color: "#FFF",
            alignSelf: 'center'
        },
        toRegistro:{
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
        inputContainer:{
            justifyContent: 'center'
        },
        input: {
            backgroundColor:'#2E4B5B',
            padding: 10,
            borderStyle: 'solid',
            color: '#FFF',
            borderRadius: 25,
            marginBottom: 15,
            marginRight: 30,
            width: '100%',
        },
        icon: {
            position: 'absolute',
            right: 15,
            marginBottom: '5%',
            color: '#FFF'
        },
        botonIngresar:{   
            marginTop: 40,
            marginBottom: 40,
            overflow: 'hidden',
            width: 200,
            borderRadius: 30,
            alignSelf: 'center',
        },
        texto:{
            padding: 20,  
            fontSize: 20,
            fontWeight: 'bold',
            color: '#FFF',
            alignSelf: 'center'
        },
        forgotPassword:{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#FF5733',
            alignSelf: 'flex-end'

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
            fontSize: 10,
            fontWeight: 'bold',
        },
        modalCaja:{
            
            alignSelf: 'flex-start',
            marginBottom: '20%'
        },
        modalTextCamposObligatorios:{
            alignSelf: 'center',
            color: '#FFF',
            fontSize: 20,
        },
    })
