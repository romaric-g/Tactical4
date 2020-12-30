import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {bounceInDown, bounceInUp, bounceInRight, bounceInLeft, bounceIn, fadeIn400, bounceInRightYourTurn, fadeIn400YourTurn} from '../Animations/Animation';
import Button from '../Components/Button';
import PartyEndInner from './PartyEndInner';
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

const PartyEnd = ({Winner, Loser, WinnerScore, LoserScore, Win, mobile, equality}: Props) => {

    const startRoom = React.useCallback(() => {
        socket.emit("StartRoom", null, (res: Models.SocketResponse) => {
            console.log(res)
        })
    }, [])

    return (
        <View style={[styles.Container]}>
            <Animatable.View animation={fadeIn400} style={styles.Bg}></Animatable.View>
            <View style={[styles.pannelcomputer, {height:mobile ? '100%' : '60%'}]}>
                <PartyEndInner
                    Winner={Winner}
                    Loser={Loser}
                    WinnerScore={WinnerScore}
                    LoserScore={LoserScore}
                    Win={Win}
                    mobile={mobile}
                    equality={equality}
                />
            </View>
        </View>
    )
}

var styles = StyleSheet.create({
    Container: {
        height: "100%",
        width:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent:"center",
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:'rgba(4, 9, 27, 0.96)',
    },
    pannel:{
        height: "100%",
        width:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        left:0,
        backgroundColor:'rgba(4, 9, 27, 0.96)',
        padding:30,
    },
    pannelcomputer:{
        height: "60%",
        width:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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

export default PartyEnd;