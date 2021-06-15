import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Button} from 'react-native'
import { db }  from '../database/firebase'
import PedidoStyles from '../styles/PedidoStyles'
import { Ionicons , FontAwesome5 , FontAwesome } from '@expo/vector-icons';

const PedidoScreen = (props) => {


    const [pedido, setPedido] = useState([])
    const pedidoID = (props.route.params.nroPedido).toString()
    const entityRef = db.collection('envios')

    useEffect(()=>{
        const subscriber = entityRef.doc(pedidoID).get().then(querySnapshot => {
            const pedidos = []
            if(querySnapshot.data()){
            pedidos.push({
                ...querySnapshot.data(),
                key: querySnapshot.id
            })
            setPedido(pedidos)
           }
           else{
               //En caso de no encontrar el codigo vuelve a la pantalla UserHomeScreen hasta que ponga el id de envio valido
               props.navigation.navigate('ConsultarPedido')
           }
        })
    }, [])
    
    return (
        <FlatList style={PedidoStyles.container} data={pedido} renderItem={({item}) => (
          <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style={PedidoStyles.inputLabelTituloPedidoID}>Código de envío</Text>
                    <Text style={PedidoStyles.inputLabelPedidoId}>{pedidoID}</Text>
                </View>
                <View style={PedidoStyles.linea}/>
                <View>
                    <Text style={PedidoStyles.inputLabelTitulo}>Dirección de entrega</Text>
                    <Text style={PedidoStyles.inputLabelDatos}>{item.direccion}</Text>
                </View>
                <View>
                    <Text style={PedidoStyles.inputLabelTitulo}>Fecha estimada de entrega</Text>
                    <Text style={PedidoStyles.inputLabelDatos}>{item.fechaEntrega}</Text>
                </View>
                <View>
                    <Text style={PedidoStyles.inputLabelTitulo}>Hora estimada de entrega</Text>
                    <Text style={PedidoStyles.inputLabelDatos}>{item.horaEntrega}</Text>
                </View>
                <View>
                    <Text style={PedidoStyles.inputLabelTitulo}>Observaciones</Text>
                    <Text style={PedidoStyles.inputLabelDatos}>{item.observaciones}</Text>
                </View>
                <View>
                    <Text style={PedidoStyles.inputLabelTitulo}>Peso</Text>
                    <Text style={PedidoStyles.inputLabelDatos}>{item.peso}</Text>
                </View>
                <View>
                    <Text style={PedidoStyles.inputLabelTitulo}>Temperatura</Text>
                    <Text style={PedidoStyles.inputLabelDatos}>{item.temperatura}</Text>
                </View>
                <View style={PedidoStyles.botonMapa}>
                    <Button color="#08AFA5" title="Ver Mapa" onPress={() => props.navigation.navigate('ChatBot')}></Button>
                </View>
                <View style={{paddingTop: 10, flexDirection: "row", justifyContent: 'space-between'}}>
                <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:75, height:75, backgroundColor:'#08AFA5', borderRadius:50}}>
                    <Ionicons name="chatbubbles" size={50} color="#003748" onPress={() => props.navigation.navigate("Home")}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:75, height:75, backgroundColor:'#08AFA5', borderRadius:50}}>
                    <FontAwesome5 name="unlock-alt" size={50} color="#003748" onPress={() => props.navigation.navigate("Home")}></FontAwesome5>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth:1, borderColor: '#08AFA5', alignItems:'center', justifyContent:'center', width:75, height:75, backgroundColor:'#08AFA5', borderRadius:50}}>
                    <FontAwesome name="pencil-square" size={50} color="#003748" onPress={() => props.navigation.navigate("Home")}></FontAwesome>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
        )}>
        </FlatList>
    )
}

export default PedidoScreen