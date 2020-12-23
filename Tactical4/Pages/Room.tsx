import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity, BackHandler, Platform, Alert} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useHistory, useParams, withRouter } from 'react-router-native';
import * as Animatable from 'react-native-animatable';
import {bounceInDown, bounceInUp, bounceInRight, bounceInLeft} from '../Animations/Animation';
import Button from '../Components/Button';
import DispAlert from '../Components/DispAlert'
import socket from '../connection';
import Models from '../types/Models';

const logo = require('../assets/logo.png');

const Room = () => {
    const history = useHistory();
    const [Back, setBack] = useState(false)
    const [copyarlert, setcopyarlert] = useState(false)

    const textRef = React.useRef<TextInput>(null)

    const params = useParams() as {[key: string]: string};
    const [ playersName, setPlayersName ] = React.useState<(string | undefined)[]>([]);

    React.useEffect(() => {
        if((Platform.OS != 'android') && (Platform.OS != 'ios')){
            window.history.pushState(null, document.title, window.location.href);
            window.addEventListener('popstate', function (event){
                window.history.pushState(null, document.title,  window.location.href);
                setBack(true)
            });
        }
        
        
        socket.emit("GetRoomInfo", null, (res: Models.GetRoomInfoResponse) => {
            console.log(res)
            if (res.success) {
                setPlayersName(res.playersName)
            }
        })
        
        socket.on("RoomPlayerListChange", (event: Models.RoomPlayerListChangeEvent) => {
            setPlayersName(event.playersName);
        })

        socket.on("RoomStart", (event: Models.RoomStartEvent) => {
            history.push("/game")
        })
    }, []);

    
    const canStart = React.useMemo(() => playersName.length == 2, [playersName])

    const startRoom = React.useCallback(() => {
        if (canStart) {
            socket.emit("StartRoom", null, (res: Models.SocketResponse) => {
                console.log(res)
            })
        }
    }, [canStart,])
    
    const focusTextInput = React.useCallback( () => {
        //console.log(textRef.current.value);
    },[textRef]
    );
    const dispBack = () => {
        setBack(!Back)
    };
    const dispalert = () => {
        setBack(!copyarlert)
    };
    useEffect(() => {
        const backAction = () => {
          console.log('back');
          return false;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
    }, []);

    const copyCodeToCB = async () => {
        if((Platform.OS != 'android') && (Platform.OS != 'ios')){
            await navigator.clipboard.writeText(`Viens jouer avec moi sur Tactical4 ! Voici le code de partie : ${params.code}`)
        }else{
            await Clipboard.setString(`Viens jouer avec moi sur Tactical4 ! Voici le code de partie : ${params.code}`);
        }
        setcopyarlert(!copyarlert)
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation={bounceInDown}>
                <Image source={logo} style={styles.logo} />
            </Animatable.View>
            <View style={styles.pageContent}>
                <View>
                    <Animatable.View animation={bounceInRight}>
                        <Text style={styles.counterPlayer}>Joueurs [{playersName.length}/2]</Text>
                    </Animatable.View>
                    {playersName.map((playerName, index) => 
                        <Animatable.View key={index} animation={bounceInRight}>
                            <Text key={index} style={styles.playerName}>{(playerName || "?")}</Text>
                        </Animatable.View>
                    )}
                </View>
                <View style={styles.footer}>
                    <Animatable.View animation={bounceInUp}>
                        <View style={styles.containerInput}>
                            <TouchableOpacity onPress={focusTextInput} style={styles.input}> 
                                <TextInput
                                    style={styles.input}
                                    placeholder={params.code}
                                    placeholderTextColor="#686D7F"
                                    value = {params.code}
                                    disableFullscreenUI
                                    selectTextOnFocus
                                    ref={textRef}
                                >
                                </TextInput>
                            </TouchableOpacity> 
                            <View style={styles.secondePartieInput}>
                                <View style={styles.traitSeparationInput}></View>
                                <TouchableOpacity onPress={copyCodeToCB}> 
                                    <Image
                                        resizeMode="contain"
                                        style={styles.shareIcon} 
                                        source={require('../assets/share.png')}
                                    />
                                </TouchableOpacity> 
                            </View>
                        </View>
                        <Button onPress={startRoom}>{ !canStart ? "Joueur en attente..." : "Lancer la partie"}</Button>
                    </Animatable.View>
                </View>
            </View>
            {Back &&
                <View style={styles.partend}>
                    <DispAlert
                    Message={"Quitter la salle d'attente?"}
                    GoHome={false}
                    Close={dispBack}
                    />
                </View>
            }
            {copyarlert &&
                <View style={styles.partend}>
                    <DispAlert
                    Message={"Quitter la salle d'attente?"}
                    GoHome={false}
                    Close={dispalert}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      flex: 1,
      resizeMode: "cover",
      alignItems: "center",
      padding: 30
    },
    counterPlayer: {
        fontSize: 36,
        color: "white",
        fontFamily: 'SuezOne_400Regular',
      },
    playerName: {
        fontSize: 24,
        color: "white",
        fontFamily: 'Montserrat_400Regular',
    },
    partend: {
        position: 'absolute',
        top: 0,
        left:0,
        width: '100%',
        height: '100%',
    },
    pageContent: {
      paddingTop: 20,
      flex: 1,
      resizeMode: "cover",
      justifyContent: "space-between",
      alignItems: "center"
    },
    logo: {
      width: 142,
      height: 54.77
    },
    input: {
        height: 50,
        width: "100%",
        backgroundColor: "#171F3C",
        borderRadius: 14,
        color: "#FFF",
        paddingHorizontal: 20,
        fontSize: 18
    },
    containerInput: {
        height: 50,
        width: 270,
        alignItems: "center",
        flexDirection: "row-reverse",
        marginBottom: 10,
    },
    traitSeparationInput: {
        height: 25,
        width: 1,
        marginRight:7,
        backgroundColor: "#FFF",
    },
    secondePartieInput: {
        height: 25,
        width: 2,
        backgroundColor: "#FFF",
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center",
        position: 'absolute',
        marginRight: 60,

    },
    shareIcon: {
        height: 20,
        width: 20,
        marginLeft: 10,
    },
    name: {
        fontFamily: 'SuezOne_400Regular',
    },
    footer: {
        width: 270
    }
});

export default Room;