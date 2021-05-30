import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer'


import UserHomeScreen from './screens/UserHomeScreen'
import PedidoScreen from './screens/PedidoScreen'
import ChatBotScreen from './screens/ChatBotScreen'

const Stack = createStackNavigator()

 function MyStack(){
  return(
      <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen name="UserHomeScreen" component={UserHomeScreen}></Stack.Screen>
        <Stack.Screen name="PedidoScreen" component={PedidoScreen}></Stack.Screen>
        <Stack.Screen name="ChatBotScreen" component={ChatBotScreen}></Stack.Screen>
      </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function MyDrawer(){
  return(
    <Drawer.Navigator>
       <Drawer.Screen name="UserHomeScreen" component={UserHomeScreen}></Drawer.Screen>
    </Drawer.Navigator>
  )

}

export default function App() {
  return (
      <NavigationContainer>
        <MyStack></MyStack>
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
