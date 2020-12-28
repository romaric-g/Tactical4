import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {bounceInDown, bounceInUp, bounceInRight, bounceInLeft, bounceIn, fadeIn400, bounceInRightYourTurn, fadeIn400YourTurn} from '../Animations/Animation';
import Button from '../Components/Button';
import socket from '../connection';
import Models from '../types/Models';

interface Props {
    Winner?: string | undefined,
    Loser?: string | undefined,
    WinnerScore?: number | undefined,
    LoserScore?: number | undefined,
    Win?:boolean | undefined,
    maxwidth?:boolean | undefined,
}

const PartyEndInner = ({Winner, Loser, WinnerScore, LoserScore, Win, maxwidth}: Props) => {

    const startRoom = React.useCallback(() => {
        socket.emit("StartRoom", null, (res: Models.SocketResponse) => {
            console.log(res)
        })
    }, [])

    return (
        <View style={styles.Container}>
            <Animatable.View animation={bounceInDown}>
                <Image style={styles.Logo} source={require('./../assets/logo.png')} />
            </Animatable.View>
            {Win ?
                <Animatable.View animation={bounceIn}>
                    <Text style={styles.WinStatut}>GAGNÉ</Text>
                </Animatable.View>
                :
                <Animatable.View animation={bounceIn}>
                    <Text style={styles.WinStatut}>PERDU</Text>
                </Animatable.View>
            }
            
            <Animatable.View animation={bounceInRight} style={styles.PlayerList}>
                <View style={styles.PlayerInfos1}>
                        <Text style={styles.PlayerName1}>1.{Winner}</Text>
                    <View style={styles.PlayerScore1Container}>
                        <Image style={styles.crown} source={require('./../assets/Crown.png')} />
                        <Text style={styles.PlayerScore1}>{WinnerScore}pts</Text>
                    </View>
                </View>
                <View style={styles.PlayerInfos2}>
                    <Text style={styles.PlayerName2}>2.{Loser}</Text>
                    <Text style={styles.PlayerScore2}>{LoserScore}pts</Text>
                </View>
            </Animatable.View>
            <Animatable.View animation={bounceInUp} style={styles.Buttons}>
                <View style={styles.Button1}>
                    <Button
                    color="noir"
                    >
                        Quitter
                    </Button>
                </View>
                <View style={styles.Button2}>
                    <Button onPress={startRoom} >Rejouer</Button>
                </View>
            </Animatable.View>
        </View>
    )
}

var styles = StyleSheet.create({
    Container: {
        height:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent:"center",
        position: 'absolute',
        // backgroundColor:"green",
    },
    pannel:{
        height: "100%",
        width:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: 'absolute',
        left:0,
        padding:30,
    },
    pannelcomputer:{
        height: "60%",
        width:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: 'absolute',
        left:0,
        backgroundColor:'rgba(4, 9, 27, 0.96)',
    },
    crown:{
        width: 20,
        height: 13,
    },
    Logo: {
        display:'flex',
        width: 144,
        height: 48,
        resizeMode:'contain',
    },
    Bg: {
        position: 'absolute',
        top: 0,
        left:0,
        width: '100%',
        height: '100%',
        backgroundColor:'rgba(4, 9, 27, 0.96)',
        opacity:0.96,
        resizeMode:'contain',
    },
    WinStatut: {
        fontSize: 36,
        fontWeight:"bold",
        textAlign: 'center',
        color: '#ffffff',
        fontFamily:'Montserrat_700Bold',
    },
    PlayerList: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    PlayerName1: {
        fontSize: 36,
        textAlign: 'center',
        color: '#ffffff',
        fontFamily:'Montserrat_700Bold',
    },
    PlayerScore1Container: {
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    Crown: {
    },
    PlayerScore1: {
        fontSize: 18,
        fontFamily:'Montserrat_300Light',
        textAlign: 'center',
        color: '#ffffff',
        marginLeft:7,
    },
    PlayerScore2: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily:'Montserrat_300Light',
    },
    PlayerName2: {
        fontSize: 24,
        textAlign: 'center',
        color: '#ffffff',
        fontFamily:'Montserrat_700Bold',
    },
    PlayerInfos1: {
        marginRight:15,
    },
    PlayerInfos2: {
        marginLeft:15,
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
    }
});

export default PartyEndInner;