import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import { auth } from './database/firebase'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegistroScreen';
import HomeScreen from './screens/HomeScreen'
import ConsultarPedidoScreen from './screens/ConsultarPedidoScreen'
import PedidoScreen from './screens/PedidoScreen'
import SeguirPedidoScreen from './screens/SeguirPedidoScreen'
import CrearEnvioScreen from './screens/CrearEnvioScreen';
import EnvioCreadoScreen from './screens/EnvioCreadoScreen'
import ReprogramarEnvioScreen from './screens/ReprogramarEnvioScreen'
import QRScannerScreen from './screens/QRScannerScreen'

const Stack = createStackNavigator()

 function MyStack(){
  return(
      <Stack.Navigator screenOptions={{headerShown: false } }>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Registro" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="ConsultarPedido" component={ConsultarPedidoScreen}></Stack.Screen>
        <Stack.Screen name="Pedido" component={PedidoScreen}></Stack.Screen>
        <Stack.Screen name="SeguirPedido" component={SeguirPedidoScreen}></Stack.Screen>
        <Stack.Screen name="QRScanner" component={QRScannerScreen}></Stack.Screen>
        <Stack.Screen name="ReprogramarEnvio" component={ReprogramarEnvioScreen}></Stack.Screen>
        <Stack.Screen name="CrearEnvio" component={CrearEnvioScreen}></Stack.Screen>
        <Stack.Screen name="EnvioCreado" component={EnvioCreadoScreen}></Stack.Screen>
      </Stack.Navigator>
  )
}


/* drawerContent={props => <CustomDrawerContent {...props}></CustomDrawerContent>} esto va en NyDrawer como atributo de Drawer.Navigator
function CustomDrawerContent(props){
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}>
      </DrawerItemList>
      <DrawerItem label={()=><Text>Logout</Text>} onPress={()=>signOut()}></DrawerItem>
    </DrawerContentScrollView>
  )
}*/

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
