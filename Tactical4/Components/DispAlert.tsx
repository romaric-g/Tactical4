import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {bounceInDown, bounceInUp, bounceInRight, bounceInLeft, fadeIn400, bounceInRightYourTurn, fadeIn400YourTurn, fadeIn} from '../Animations/Animation';
import Button from '../Components/Button';
import socket from '../connection';
import Models from '../types/Models';

interface Props {
    message?: string | undefined,
    type?: 'requestHome' | 'forceHome',
    dispBack?: () => void,
    quitRoom: () => void
}

const DispAlert = ({message, type, dispBack, quitRoom}: Props) => {

    return (
        <View style={styles.Container}>
            <Animatable.View animation={fadeIn400} style={styles.Bg}></Animatable.View>
            <Animatable.View animation={bounceInUp} style={styles.Box}>
                <Image style={styles.Logo} source={require('./../assets/logo.png')} />
                <Text style={styles.Message}>{message}</Text>
                {type === 'forceHome' ?
                    <View style={styles.Button2}>
                        <Button
                            onPress={quitRoom}
                        >
                            Retour à l'accueil
                        </Button>
                    </View>
                    :
                    <View style={styles.Buttons}>
                        <View style={styles.Button1}>
                            <Button
                                color="noir"
                                onPress={quitRoom}
                            >
                                Quitter
                            </Button> 
                        </View>
                        <View style={styles.Button2}>
                            <Button onPress={dispBack}>Annuler</Button>
                        </View>
                    </View>
                }
            </Animatable.View>
        </View>
    )
}

var styles = StyleSheet.create({
    Container: {
        height: "100%",
        width:"100%",
        // padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: 'absolute',
        top:0,
        left:0,
        justifyContent:'center',
    },
    Bg: {
        position: 'absolute',
        top: 0,
        left:0,
        flex:1,
        width: '100%',
        height: '100%',
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
        backgroundColor:'#131829',
        padding:30,
        borderRadius:14,
    },
    Message: {
        color: "#FFFFFF",
        marginTop: 30,
        marginBottom: 30,
        fontSize: 18,
        fontFamily:'Montserrat_400Regular',
    },
});

export default DispAlert;