import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import SeguirPedidoStyles from '../styles/SeguirPedidoStyles';
import MapView, { Marker } from 'react-native-maps';
import { db, rt }  from '../database/firebase'

const SeguirPedidoScreen = (props) => {

  const idPedido = (props.route.params.idPedido).toString()
  const entityRef = db.collection('track');


  const [mapRegion, setmapRegion] = useState({
    latitude:0,
    longitude: 0,
    latitudeDelta: 0.09,
    longitudeDelta: 0.02,
  });

  useEffect(() => {
    rt.ref('/track').on('value', snapshot => {
      const mr = {
        latitude: snapshot.val().latitude,
        longitude: snapshot.val().longitude, 
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
      setmapRegion(mr)
    })
  }, [])

/*
    entityRef.doc(idPedido).onSnapshot(documentSnapshot => {
      const mr = {
        latitude: documentSnapshot.get("latitude"),
        longitude: documentSnapshot.get("longitude"), 
        latitudeDelta: documentSnapshot.get("latitudeDelta"),
        longitudeDelta: documentSnapshot.get("longitudeDelta"),
      }
      setmapRegion(mr)
    })
  }, [])
*/


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