import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen'
import ConsultarPedidoScreen from './screens/ConsultarPedidoScreen'
import PedidoScreen from './screens/PedidoScreen'
import ChatBotScreen from './screens/ChatBotScreen'
import CrearEnvioScreen from './screens/CrearEnvioScreen';
import EnvioCreadoScreen from './screens/EnvioCreadoScreen'
import ReprogramarEnvioScreen from './screens/ReprogramarEnvioScreen'

const Stack = createStackNavigator()

 function MyStack(){
  return(
      <Stack.Navigator screenOptions={{headerShown: false } }>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="ConsultarPedido" component={ConsultarPedidoScreen}></Stack.Screen>
        <Stack.Screen name="Pedido" component={PedidoScreen}></Stack.Screen>
        <Stack.Screen name="ReprogramarEnvio" component={ReprogramarEnvioScreen}></Stack.Screen>
        <Stack.Screen name="CrearEnvio" component={CrearEnvioScreen}></Stack.Screen>
        <Stack.Screen name="ChatBot" component={ChatBotScreen}></Stack.Screen>
        <Stack.Screen name="EnvioCreado" component={EnvioCreadoScreen}></Stack.Screen>
      </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function MyDrawer(){
  return(
    <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor: "#08AFA5", }} drawerContentOptions={{activeTintColor: '#000',activeBackgroundColor: "rgba(255,255,255,0.5)"} }>
       <Drawer.Screen name="Home" component={MyStack}></Drawer.Screen>
       <Drawer.Screen name="CrearEnvio" component={CrearEnvioScreen}></Drawer.Screen>
    </Drawer.Navigator>
  )

}

export default function App() {
  return (
      <NavigationContainer>
        <MyDrawer></MyDrawer>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
