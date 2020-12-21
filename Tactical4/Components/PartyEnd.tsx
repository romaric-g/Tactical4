import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../Components/Button';
import socket from '../connection';
import Models from '../types/models';

interface Props {
    Winner?: string | undefined,
    Loser?: string | undefined,
    WinnerScore?: number | undefined,
    LoserScore?: number | undefined,
    Win?:boolean | undefined,
}

const PartyEnd = ({Winner, Loser, WinnerScore, LoserScore, Win}: Props) => {

    const startRoom = React.useCallback(() => {
        socket.emit("StartRoom", null, (res: Models.SocketResponse) => {
            console.log(res)
        })
    }, [])

    return (
        <View style={styles.Container}>
            <Image style={styles.Logo} source={require('./../assets/logo.png')} />
            {Win ?
                <Text style={styles.WinStatut}>GAGNÉ</Text>
                :
                <Text style={styles.WinStatut}>PERDU</Text>
            }
            <View style={styles.PlayerList}>
                <View style={styles.PlayerInfos1}>
                        <Text style={styles.PlayerName1}>1.{Winner}</Text>
                    <View style={styles.PlayerScore1Container}>
                        <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M16.377 11.0363H3.62307C3.42815 11.0363 3.24612 10.9387 3.13635 10.7747C1.45354 8.26674 1.32463 3.44216 1.31487 2.72593C1.31409 2.69775 1.31409 2.66956 1.31409 2.64137C1.31409 2.31105 1.57698 2.04346 1.90198 2.04266H1.90315C2.22737 2.04266 2.49104 2.30906 2.49221 2.63899C2.49221 2.64296 2.49221 2.67829 2.49377 2.74102C2.54573 4.44423 3.92502 5.81355 5.61331 5.81355C7.3344 5.81355 8.7344 4.39064 8.7344 2.64137C8.7344 2.31065 8.99807 2.04266 9.32346 2.04266H10.6766C11.002 2.04266 11.2656 2.31065 11.2656 2.64137C11.2656 4.39064 12.666 5.81355 14.3871 5.81355C16.077 5.81355 17.4574 4.44185 17.5071 2.73626C17.5082 2.67631 17.5086 2.64296 17.5086 2.63899C17.5098 2.30906 17.7731 2.04266 18.0977 2.04266H18.0989C18.4239 2.04346 18.6867 2.31105 18.6867 2.64137C18.6867 2.66956 18.6864 2.69814 18.686 2.72633C18.6762 3.44255 18.5469 8.26713 16.8645 10.7751C16.7539 10.9383 16.5715 11.0363 16.377 11.0363Z" fill="#FECF55"/>
                            <path d="M18.098 2.04266C18.0977 2.04266 18.0973 2.04266 18.0969 2.04266C17.7727 2.04266 17.509 2.30906 17.5078 2.63899C17.5078 2.64296 17.5078 2.6767 17.5062 2.73626C17.4566 4.44145 16.0762 5.81355 14.3863 5.81355C12.6652 5.81355 11.2652 4.39064 11.2652 2.64137C11.2652 2.31065 11.0016 2.04266 10.6762 2.04266H10V11.0359H16.377C16.5719 11.0359 16.7539 10.9383 16.8637 10.7747C18.5465 8.26674 18.6754 3.44176 18.6852 2.72593C18.6859 2.69775 18.6859 2.66956 18.6859 2.64137C18.6859 2.31105 18.423 2.04306 18.098 2.04266Z" fill="#DDB44A"/>
                            <path d="M9.99999 0C8.95077 0 8.09686 0.867884 8.09686 1.93428C8.09686 3.00067 8.95077 3.86816 9.99999 3.86816C11.0492 3.86816 11.9031 3.00067 11.9031 1.93428C11.9031 0.867884 11.0492 0 9.99999 0Z" fill="#FECF55"/>
                            <path d="M10 0V3.86856C11.0492 3.86856 11.9027 3.00067 11.9027 1.93428C11.9027 0.867884 11.0492 0 10 0Z" fill="#DDB44A"/>
                            <path d="M1.90313 1.4928C0.853906 1.4928 0 2.36029 0 3.42708C0 4.49387 0.853906 5.36135 1.90313 5.36135C2.95234 5.36135 3.80586 4.49347 3.80586 3.42708C3.80586 2.36068 2.95234 1.4928 1.90313 1.4928Z" fill="#FECF55"/>
                            <path d="M18.0969 1.4928C17.0477 1.4928 16.1942 2.36068 16.1942 3.42708C16.1942 4.49347 17.0477 5.36096 18.0969 5.36096C19.1461 5.36096 20 4.49347 20 3.42708C20 2.36029 19.1461 1.4928 18.0969 1.4928Z" fill="#DDB44A"/>
                            <path d="M16.377 13H3.62306C3.29767 13 3.034 12.732 3.034 12.4013V10.6163H16.966V12.4013C16.966 12.732 16.7024 13 16.377 13Z" fill="#FECF55"/>
                            <path d="M10 13H16.377C16.7023 13 16.966 12.732 16.966 12.4013V10.6163H10V13Z" fill="#DDB44A"/>
                            </g>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="20" height="13" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <Text style={styles.PlayerScore1}>{WinnerScore}pts</Text>
                    </View>
                </View>
                <View style={styles.PlayerInfos2}>
                    <Text style={styles.PlayerName2}>2.{Loser}</Text>
                    <Text style={styles.PlayerScore2}>{LoserScore}pts</Text>
                </View>
            </View>
            <View style={styles.Buttons}>
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
            </View>
        </View>
    )
}

var styles = StyleSheet.create({
    Container: {
        height: "100%",
        width:"100%",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor:'rgba(4, 9, 27, 0.96)',
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
    },
    PlayerList: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    PlayerName1: {
        fontSize: 36,
        fontWeight:"bold",
        textAlign: 'center',
        color: '#ffffff',
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
        fontWeight:"100",
        textAlign: 'center',
        color: '#ffffff',
        marginLeft:7,
    },
    PlayerScore2: {
        fontSize: 14,
        color: '#ffffff',
    },
    PlayerName2: {
        fontWeight:"bold",
        fontSize: 24,
        textAlign: 'center',
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

export default PartyEnd;