import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, ActivityIndicator} from 'react-native'

const ChatBotScreen = (props) => {
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.texto}>
                <Text>ChatBotScreen</Text>       
            </View>
            <View>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            padding:60,
        }
    ,
        texto: {
            fontSize: 40,
            flex: 1,
            padding: 10,
            color: 'black'
        }
    }
)

export default ChatBotScreen