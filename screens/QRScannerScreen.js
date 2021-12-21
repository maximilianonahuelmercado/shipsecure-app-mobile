import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ProgressViewIOSComponent } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import QRScannerStyles from '../styles/QRScannerStyles';
import Modal from 'react-native-modal'
import { rt, db, auth } from '../database/firebase'

const QRScannerScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [ok, setOk] = useState(false);
  const [nok, setNOK] = useState(false);
  const [qr, setQR] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
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
    console.log("Campo modal:", isModalVisible)
  }, [isModalVisible])

  useEffect(()=>{
    console.log("Campo Scanned:", scanned)
  }, [scanned])

  useEffect(()=>{
    console.log("Campo OK:", ok)
  }, [ok])

  useEffect(()=>{
    console.log("Campo NOK:", nok)
  }, [nok])

  useEffect(() => {
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

  const scanAgain = ()  => {
    setScanned(false)
    setNOK(false)
    setOk(false)
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Se escaneo ${type} con el siguiente dato: ${data}`);
    console.log("StateQR:" + qr)
    console.log("idPedido:" + idPedido)
    console.log("data: " + data)
    if (qr === data && idPedido === qr && email === auth?.currentUser?.email) {
      rt.ref('envio').update({
        puerta: false
      })
      historicoRef.doc(idPedido).set({
        id: idPedido,
        fecha: fecha,
        direccion: direccion,
        localidad: localidad,
        provincia: provincia,
        email: email
      })
      //envioRef.doc(idPedido).delete()
      setOk(true)
      setModalVisible(true)
    }
    else {
      setNOK(true)
      setModalVisible(true)
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
          <Button color="#08AFA5" title={'Presiona para escanear de nuevo'} onPress={scanAgain} />
        </View>
        {
          ok && <View>
            <Modal isVisible={isModalVisible}>
              <View style={QRScannerStyles.modal}>
                <Ionicons name="lock-open-outline" size={150} color="#08AFA5"></Ionicons>
                <Text style={QRScannerStyles.texto}>Su código ha sido confirmado con éxito</Text>
                <Text style={QRScannerStyles.gratitud}>¡Gracias por usar ShipSecure!</Text>
                <View style={QRScannerStyles.modalCaja}>
                </View>
                <View>
                  <Button color="#08AFA5" title="VOLVER" onPress={ ()=> props.navigation.navigate('Home')} />
                </View>
              </View>
            </Modal>
          </View>
        }
        {
          nok && <View>
            <Modal isVisible={isModalVisible}>
              <View style={QRScannerStyles.modal}>
              <Ionicons name="sad-outline" size={150} color="#FF5733"></Ionicons>
                <Text style={QRScannerStyles.texto}>No ha sido posible escanear su código</Text>
                <View style={QRScannerStyles.modalCaja}>
                </View>
                <View>
                  <Button color="#08AFA5" title="VOLVER" onPress={toggleModal} />
                </View>
              </View>
            </Modal>
          </View>
        }
      </View>
      }
      
    </View>
  );
}

export default QRScannerScreen