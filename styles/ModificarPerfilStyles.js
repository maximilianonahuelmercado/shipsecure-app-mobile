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
        avatar: {
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 30
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
        botonActualizar:{   
            marginTop: 40,
            marginBottom: 40,
            overflow: 'hidden',
            width: 200,
            borderRadius: 30,
            alignSelf: 'center', 
        },
        texto:{
            padding: 20,  
            fontSize: 15,
            fontWeight: 'bold',
            color: '#FFF',
            alignSelf: 'center'
        }
    })
