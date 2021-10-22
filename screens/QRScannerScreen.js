import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ProgressViewIOSComponent } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRScannerStyles from '../styles/QRScannerStyles';
import Modal from 'react-native-modal'
import { rt, db, auth }  from '../database/firebase'

const QRScannerScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qr, setQR] = useState('')
  const [isModalVisible, setModalVisible] = useState(true);
  const envioRef = db.collection('envios')
  const historicoRef = db.collection('historicos');
  const email = (props.route.params.email).toString()
  const fecha = (props.route.params.fecha).toString()
  const direccion = (props.route.params.direccion).toString()
  const localidad = (props.route.params.localidad).toString()
  const provincia = (props.route.params.provincia).toString()
  const idPedido = (props.route.params.idPedido).toString()

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  useEffect(()=>{
    rt.ref('/envio').on('value', snapshot => {
      const qr = snapshot.val().idQR
      setQR(qr)
      console.log(qr)
    })   
  }, [])

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Se escaneo ${type} con el siguiente dato: ${data}`);
      console.log("StateQR:" + qr)
      console.log("idPedido:" + idPedido)
      console.log("data: " + data)
      if(qr === data && idPedido === qr && email === auth?.currentUser?.email ){
        rt.ref('envio').update({
          puerta: true
        })
        historicoRef.doc(idPedido).set({
          id: idPedido,
          fecha: fecha,
          direccion: direccion,
          localidad: localidad,
          provincia: provincia,
          email: email
        })
        envioRef.doc(idPedido).delete()
      }
      else{
        alert('El codigo no corresponde al pedido asociado')
      }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos de camara</Text>;
  }
  if (hasPermission === false) {
    return <Text>Acceso a la camara denegado</Text>;
  }

  return (
    <View style={QRScannerStyles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <View>
                  <View style={QRScannerStyles.boton}>
                    <Button color="#08AFA5"  title={'Presiona para escanear de nuevo'} onPress={() => setScanned(false)} />
                  </View>
                    <Modal isVisible={isModalVisible}>
                      <View style={QRScannerStyles.modal}>
                          <Text style={QRScannerStyles.texto}>Su código ha sido confirmado con éxito</Text> 
                          <Text style={QRScannerStyles.gratitud}>¡Gracias por usar ShipSecure!</Text>
                          <View style={QRScannerStyles.modalCaja}>
                          </View>
                          <View>
                              <Button color="#08AFA5" title="VOLVER" onPress={()=> props.navigation.navigate('Home')} />
                          </View>
                      </View>
                    </Modal> 
                  </View>
                  }
    </View>
  );
}

export default QRScannerScreen