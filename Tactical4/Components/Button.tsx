import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    children: string
}

const Button = ({children}: Props) => {
    return (
        <TouchableOpacity onPress={() => {}}>
            <LinearGradient style={styles.linearGradient} colors={['#72FFBB', '#008A48']} >
                <Text style={styles.buttonText}>{children}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

var styles = StyleSheet.create({
    linearGradient: {
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 12,
      width: "100%",
      height: 50
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'SuezOne_400Regular',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent'
    },
});

export default Button;