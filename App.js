import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import LoginScreen from './screens/LoginScreen';
import ReestablecerPasswordScreen from './screens/ReestablecerPasswordScreen';
import RegistroScreen from './screens/RegistroScreen';
import HomeScreen from './screens/HomeScreen'
import BeneficiosScreen from './screens/BeneficiosScreen';
import ModificarPerfilScreen from './screens/ModifcarPerfilScreen';
import ConsultarPedidoScreen from './screens/ConsultarPedidoScreen'
import RepartidorScreen from './screens/RepartidorScreen'
import PedidoScreen from './screens/PedidoScreen'
import ChatScreen from './screens/ChatScreen';
import SeguirPedidoScreen from './screens/SeguirPedidoScreen'
import CrearEnvioScreen from './screens/CrearEnvioScreen';
import EnvioCreadoScreen from './screens/EnvioCreadoScreen'
import ReprogramarEnvioScreen from './screens/ReprogramarEnvioScreen'
import QRScannerScreen from './screens/QRScannerScreen'


const Stack = createStackNavigator()


 function MyHomeStack(){
  return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="ConsultarPedido" component={ConsultarPedidoScreen}></Stack.Screen>
        <Stack.Screen name="Repartidor" component={RepartidorScreen}></Stack.Screen>
        <Stack.Screen name="Pedido" component={PedidoScreen}></Stack.Screen>
        <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
        <Stack.Screen name="SeguirPedido" component={SeguirPedidoScreen}></Stack.Screen>
        <Stack.Screen name="QRScanner" component={QRScannerScreen}></Stack.Screen>
        <Stack.Screen name="ReprogramarEnvio" component={ReprogramarEnvioScreen}></Stack.Screen>
        <Stack.Screen name="CrearEnvio" component={CrearEnvioScreen}></Stack.Screen>
        <Stack.Screen name="EnvioCreado" component={EnvioCreadoScreen}></Stack.Screen> 
      </Stack.Navigator>
  )
}


const Drawer = createDrawerNavigator();


function MyDrawer(){
  return(
    <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor: "#08AFA5" }} drawerContentOptions={{activeTintColor: '#000',activeBackgroundColor: "rgba(255,255,255,0.5)"} }>
       <Drawer.Screen name="Home" component={MyHomeStack}></Drawer.Screen>
       <Drawer.Screen name="Editar Perfil" component={ModificarPerfilScreen}></Drawer.Screen>
       <Drawer.Screen name="Beneficios" component={BeneficiosScreen}></Drawer.Screen>
    </Drawer.Navigator>
  )

}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="ReestablecerPassword" component={ReestablecerPasswordScreen}/>
          <Stack.Screen name="Registro" component={RegistroScreen}/>
          <Stack.Screen name="Home" component={MyDrawer}/>
        </Stack.Navigator>
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
