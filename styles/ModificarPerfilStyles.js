import { StyleSheet } from "react-native";

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: '5%',
            backgroundColor: '#003748'
        },
        avatar: {
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 30
        },
        titulo:{
            fontSize:15,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: '#FF5733',
            alignSelf: 'center'
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
        inputBlocked: {
            alignSelf: 'flex-start',
            padding: 5,
            backgroundColor:'#2E4B5B',
            borderStyle: 'solid',
            color: '#827B7B',
            borderRadius: 25,
            marginBottom: 15,
            marginRight: 30,
            width: '100%'
        },
        botonActualizar:{   
            marginTop: 20,
            overflow: 'hidden',
            width: '50%',
            borderRadius: 30,
            alignSelf: 'center', 
        },
        texto:{  
            paddingLeft: 10,
            fontWeight: 'bold',
            color: '#FFF',
            alignSelf: 'flex-start'
        },
        inputContainer:{
            justifyContent: 'center'
        },
        icon: {
            position: 'absolute',
            right: 15,
            marginBottom: '5%',
            color: '#FFF'
        }
    })
