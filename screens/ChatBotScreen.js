import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, ActivityIndicator, SafeAreaView} from 'react-native'

const ChatBotScreen = (props) => {

    
    return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
            <View>
                
            </View>
        </ScrollView>
    </SafeAreaView>
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