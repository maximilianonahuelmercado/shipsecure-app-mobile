import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRScannerStyles from '../styles/QRScannerStyles';
import { db, auth }  from '../database/firebase'

const QRScannerScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const entityRef = db.collection('envios');
  const idPedido = (props.route.params.idPedido).toString()

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Se escaneo ${type} con el siguiente dato: ${data}`);
    entityRef.doc(idPedido).get().then(querySnapshot => {
      if(querySnapshot.data().codigoCaja === data && querySnapshot.data().email === auth?.currentUser?.email ){
        alert(`el codigo es: ${data}`)
      }
      else{
        alert('El codigo no corresponde al pedido asociado')
      }
    })
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
      {scanned && <Button title={'Presiona para escanear de nuevo'} onPress={() => setScanned(false)} />}
    </View>
  );
}

export default QRScannerScreen