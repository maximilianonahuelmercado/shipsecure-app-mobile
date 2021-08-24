import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import SeguirPedidoStyles from '../styles/SeguirPedidoStyles';
import MapView, { Marker } from 'react-native-maps';
import { db }  from '../database/firebase'

const SeguirPedidoScreen = () => {

  const entityRef = db.collection('track');

  const [mapRegion, setmapRegion] = useState({
    latitude:0,
    longitude: 0,
    latitudeDelta: 0.09,
    longitudeDelta: 0.02,
  });

  useEffect(() => {
    entityRef.doc('111111').onSnapshot(documentSnapshot => {
      const mr = {
        latitude: documentSnapshot.get("latitude"),
        longitude: documentSnapshot.get("longitude"), 
        latitudeDelta: documentSnapshot.get("latitudeDelta"),
        longitudeDelta: documentSnapshot.get("longitudeDelta"),
      }
      setmapRegion(mr)
    })
  }, [])

  return (
    <View style={SeguirPedidoStyles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>
    </View>
  );
}

export default SeguirPedidoScreen