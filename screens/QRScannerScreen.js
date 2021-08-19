import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRScannerStyles from '../styles/QRScannerStyles';
import { db }  from '../database/firebase'

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const entityRef = db.collection('envios');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Se escaneo ${type} con el siguiente dato: ${data}`);
    entityRef.where('Codigo', '==', data).get().then(querySnapshot => {
      console.log("Codigo OK")
      querySnapshot.forEach(documentSnapshot => {
        alert(`el codigo es: ${data}`)
      })
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