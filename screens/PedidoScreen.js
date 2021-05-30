import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TextInput, ActivityIndicator} from 'react-native'
import { db }  from '../database/firebase'
import PedidoStyles from '../styles/PedidoStyles'

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
               props.navigation.navigate('UserHomeScreen')
           }
        })
    }, [])
    
    return (
        <FlatList style={PedidoStyles.container} data={pedido} renderItem={({item}) => (
            <ScrollView >
                <View>
                    <Text style={PedidoStyles.inputLabelTituloPedidoID}>Código de envío</Text>
                    <Text style={PedidoStyles.inputLabelPedidoId}>{pedidoID}</Text>
                </View>
                <View style={PedidoStyles.linea}/>
                <View>
                    <Text style={PedidoStyles.inputLabelTitulo}>Domicilio</Text>
                    <Text style={PedidoStyles.inputLabelDatos}>{item.domicilio}</Text>
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
            </ScrollView>
        )}>
        </FlatList>
    )
}

export default PedidoScreen