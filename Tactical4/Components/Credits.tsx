import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {bounceInDown, bounceInUp, bounceInRight, bounceInLeft, fadeIn400, bounceInRightYourTurn, fadeIn400YourTurn} from '../Animations/Animation';
import Button from './Button';
import socket from '../connection';
import Models from '../types/Models';

interface Props {
    Close?: any,
}
const romalink = () => {
    if(Platform.OS == 'web'){
        window.open('https://romaricgauzi.com', '_blank');
    } else {
        Linking.canOpenURL('https://romaricgauzi.com').then(supported => {
            if (supported) {
              Linking.openURL('https://romaricgauzi.com');
              console.log("We open URI: " + 'https://romaricgauzi.com');
            } else {
              console.log("Don't know how to open URI: " + 'https://romaricgauzi.com');
            }
        });
    }
}
const tardilink = () => {
    if(Platform.OS == 'web'){
        window.open('https://www.antoinetardivel.com', '_blank');
    } else {
        Linking.canOpenURL('https://www.antoinetardivel.com').then(supported => {
            if (supported) {
                Linking.openURL('https://www.antoinetardivel.com');
                console.log("We open URI: " + 'https://www.antoinetardivel.com');
            } else {
                console.log("Don't know how to open URI: " + 'https://www.antoinetardivel.com');
            }
        });
    }
  };

const Credits = ({Close}: Props) => {
    return (
        <View style={styles.Container}>
            <Animatable.View animation={fadeIn400} style={styles.Bg}></Animatable.View>
            <Animatable.View animation={bounceInUp} style={styles.Box}>
                <Image style={styles.Logo} source={require('./../assets/logo.png')} />
                <View style={styles.MessageContainer}>
                    <Text style={styles.Message1}>Développeurs du projet:</Text>
                    <View style={styles.linkContainer}>
                        <TouchableOpacity onPress={romalink}>
                            <Text style={styles.Message3}>Romaric Gauzi</Text>
                        </TouchableOpacity>
                        <Text style={styles.Message2}> et </Text>
                        <TouchableOpacity onPress={tardilink}>
                            <Text style={styles.Message3}>Antoine Tardivel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Button onPress={Close}>Retour</Button>
            </Animatable.View>
        </View>
    )
}

var styles = StyleSheet.create({
    Container: {
        flex:1,
        height:'100%',
        width:'100%',
        padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        top:0,
        left:0,
        justifyContent:'center',
    },
    Bg: {
        position: 'absolute',
        top: 0,
        left:0,
        width: '200%',
        height: '200%',
        backgroundColor:'rgba(4, 9, 27, 0.96)',
        opacity:0.96,
        resizeMode:'contain',
    },
    Logo: {
        display:'flex',
        width: 144,
        height: 48,
        resizeMode:'contain',
    },
    Buttons: {
        display:'flex',
        flexDirection: 'row',
    },
    Button1: {
        marginRight:7,
    },
    Button2: {
        marginLeft:7,
    },
    Box: {
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        // backgroundColor:'#131829',
        padding:30,
        borderRadius:14,
    },
    Message1: {
        color: "#FFFFFF",
        fontSize: 18,
        width: "80%",
        textAlign:'center',
        fontFamily:'Montserrat_400Regular'
    },
    linkContainer:{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
    },
    Message2: {
        color: "#FFFFFF",
        fontSize: 24,
        textAlign:'center',
        fontFamily:'Montserrat_400Regular'
    },
    Message3: {
        color: "#FFFFFF",
        fontSize: 24,
        textAlign:'center',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#FFFFFF",
        fontFamily:'Montserrat_400Regular'
    },
    MessageContainer:{
        marginTop: 30,
        marginBottom: 30,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
});

export default Credits;