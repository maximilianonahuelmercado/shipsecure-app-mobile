import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,SafeAreaView, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import SeguirPedidoStyles from '../styles/SeguirPedidoStyles';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { db, rt }  from '../database/firebase'
import Geolocation from "react-native-geolocation-service"


const SeguirPedidoScreen = (props) => {


  const darkMode = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]



 /*Se debe setear un estado incial para el objeto mapRegion si no sale por error*/
  const [mapRegion, setmapRegion] = useState({
    latitude:0,
    longitude: 0,
    latitudeDelta: 0.09,
    longitudeDelta: 0.02,
  });

  const [coordenadas, setCoordenadas] = useState([])

  /*
  useEffect(()=>{
    (async () => {
    
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let locations = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest,  distanceInterval: 1 }, (loc) => {
        setmapRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.009,
        })
        setCoordenadas(prevCoords => [
          ...prevCoords,
          { 
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude
          }
        ])
      })
  })();
  }, [])*/

  useEffect(()=>{
  },[mapRegion])

  useEffect(()=>{
  }, [coordenadas])

  //Original para el dia de la presentacion
  useEffect(() => {
    rt.ref('/sensores').on('value', snapshot => {
      const mr = {
        latitude: parseFloat(snapshot.val().latitude),
        longitude: parseFloat(snapshot.val().longitude), 
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }
      setmapRegion(mr)
      setCoordenadas(prevCoords => [
        ...prevCoords,
        { 
          latitude: parseFloat(snapshot.val().latitude),
          longitude: parseFloat(snapshot.val().longitude)
        }
      ])
    })
  }, [])



 return (
    <View style={SeguirPedidoStyles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={mapRegion}
        customMapStyle={darkMode}
      >
        <Polyline coordinates={coordenadas}
        strokeColor="#FF5733"
        strokeWidth={6}
        />
        <Marker coordinate={mapRegion}  title='ShipSecure' icon={{uri: "https://i.ibb.co/SPP9SWt/seguimiento-caja-icono.png" }}/>
      </MapView>
    </View>
  );
}

export default SeguirPedidoScreen