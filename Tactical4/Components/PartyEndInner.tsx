import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {bounceInDown, bounceInUp, bounceInRight, bounceInLeft, bounceIn, fadeIn400, bounceInRightYourTurn, fadeIn400YourTurn} from '../Animations/Animation';
import Button from './Button';
import socket from '../connection';
import Models from '../types/Models';

interface Props {
    Winner?: string | undefined,
    Loser?: string | undefined,
    WinnerScore?: number | undefined,
    LoserScore?: number | undefined,
    Win?:boolean | undefined,
    mobile?:boolean | undefined,
    equality?:boolean | undefined,
}

const PartyEndInner = ({Winner, Loser, WinnerScore, LoserScore, Win, mobile, equality}: Props) => {

    const startRoom = React.useCallback(() => {
        socket.emit("StartRoom", null, (res: Models.SocketResponse) => {
            console.log(res)
        })
    }, [])

    return (
        <View style={[styles.Container, {paddingVertical:mobile ? 30 : 0}]} >
            <Animatable.View delay={4000} animation={bounceInDown}>
                <Image style={styles.Logo} source={require('./../assets/logo.png')} />
            </Animatable.View>
            {
                equality ?
                    (<Animatable.View delay={4000} animation={bounceIn}>
                            <Text style={styles.WinStatut}>ÉGALITÉ</Text>
                    </Animatable.View>)
                :
                    (Win ?
                        <Animatable.View delay={4000} animation={bounceIn}>
                            <Text style={styles.WinStatut}>GAGNÉ</Text>
                        </Animatable.View>
                        :
                        <Animatable.View delay={4000} animation={bounceIn}>
                            <Text style={styles.WinStatut}>PERDU</Text>
                        </Animatable.View>
                    )
                
            }
            <Animatable.View delay={4000} animation={bounceInRight} style={styles.PlayerList}>
                <View style={styles.PlayerInfos1}>
                        <Text style={[styles.PlayerName, {fontSize:equality ? 30 : 36}]}>1.{Winner}</Text>
                    <View style={styles.PlayerScore1Container}>
                        {
                            equality === false && <Image style={styles.crown} source={require('./../assets/Crown.png')} />
                        }
                        <Text style={[styles.PlayerScore, {fontSize:equality ? 16 : 18}, {marginLeft:equality ? 0 : 7}]}>{WinnerScore}pts</Text>
                    </View>
                </View>
                <View style={styles.PlayerInfos2}>
                    <Text style={[styles.PlayerName, {fontSize:equality ? 30 :  24}]}>2.{Loser}</Text>
                    <Text style={[styles.PlayerScore, {fontSize:equality ? 16 : 14}]}>{LoserScore}pts</Text>
                </View>
            </Animatable.View>
            <Animatable.View delay={4000} animation={bounceInUp} style={styles.Buttons}>
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
    PlayerName: {
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
    PlayerScore: {
        fontFamily:'Montserrat_300Light',
        textAlign: 'left',
        color: '#ffffff',
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