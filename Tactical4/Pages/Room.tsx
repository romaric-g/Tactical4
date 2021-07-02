import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity, BackHandler, Platform, Alert} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useHistory, useParams, withRouter } from 'react-router-native';
import * as Animatable from 'react-native-animatable';
import {bounceInDown, bounceInUp, bounceInRight, bounceInLeft} from '../Animations/Animation';
import Button from '../Components/Button';
import '@expo/match-media'
import { useMediaQuery } from "react-responsive";
import DispAlert from '../Components/DispAlert'
import socket from '../connection';
import Models from '../types/Models';
import Chat, { ChatMessage } from '../Components/Chat';

const logo = require('../assets/logo.png');


const Room = () => {

    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
        // alternatively...
        query: "(max-device-width: 1224px)"  
    });
    const [maxwidth, setmaxwidth] = useState(false);
    React.useEffect(() => {
        if((Platform.OS != 'android') && (Platform.OS != 'ios')){
            if(window.innerWidth >= window.innerHeight){
                setmaxwidth(false);
            }else{
                setmaxwidth(true);
            }
        }
    },[]);
    if((Platform.OS != 'android') && (Platform.OS != 'ios')){
        window.addEventListener('resize', (event) => {
            if(window.innerWidth >= window.innerHeight){
                setmaxwidth(false);
            }else{
                setmaxwidth(true);
            }
        });
    }

    const history = useHistory();
    const [Back, setBack] = useState(false)
    const [copyarlert, setcopyarlert] = useState(false)
    const [ messages, setMessages ] = React.useState<ChatMessage[]>([])

    const pushMessage = React.useCallback((message: string) => {
        setMessages((lastMessages) => [
            ...lastMessages, 
            {
                message: message,
                created: Date.now()
            }
        ]);
    }, [setMessages])

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
            if (res.success) {
                setPlayersName(res.playersName)
            }
        })

        const roomStart = (event: Models.RoomStartEvent) => {
            history.push("/game")
        }
        
        socket.on("RoomStart", roomStart);
        socket.on("RoomPlayerListChange", roomPlayerListChange);

        return () => {
            socket.off('RoomPlayerListChange', roomPlayerListChange);
            socket.off('RoomStart', roomStart);
        }
    }, []);

            
    const roomPlayerListChange = React.useCallback((event: Models.RoomPlayerListChangeEvent) => {
        setPlayersName(event.playersName);
        switch(event.reason) {
            case 'join':
                return pushMessage(`${ event.playerName } a rejoint la partie.`);
            case 'kick':
                return pushMessage(`${ event.playerName } a été exclu de la partie.`);
            case 'leave':
                return pushMessage(`${ event.playerName } a quitté la partie.`);
        }
    }, [setPlayersName, pushMessage, messages])

    const canStart = React.useMemo(() => playersName.length == 2, [playersName])

    const startRoom = React.useCallback(() => {
        if (canStart) {
            socket.emit("StartRoom", null, (res: Models.SocketResponse) => {
                // console.log(res)
            })
        }
    }, [canStart,])

    const quitRoom = React.useCallback(() => {
        socket.emit("QuitRoom", null, (e: Models.SocketResponse) => { console.log(e) })
        history.push("/")
    }, []);

    
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
        //   console.log('back');
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
    if (maxwidth) {
        return (
            <View style={styles.containerportrait}>
                <Image style={styles.turnyourdevice} source={require('./../assets/turndevice.gif')} />
                <Text style={styles.textportrait}>Tourne ton écran ou élargis ta fenêtre pour une meilleure expérience.</Text>
            </View>
        )
    }
    return (
        <View style={styles.containerfirst}>
            <Chat messages={messages} />
            <View style={[styles.container, {paddingHorizontal:isTabletOrMobileDevice ? 30 : 0}, {justifyContent:isTabletOrMobileDevice ? 'flex-start' : 'center'}]}>
                <Animatable.View animation={bounceInRight} style={styles.backContainer}>
                    <TouchableOpacity onPress={dispBack}>
                        <Image
                            resizeMode="contain"
                            style={styles.backIcon} 
                            source={require('../assets/arrowback.png')}
                        />
                    </TouchableOpacity>
                </Animatable.View>
                <View style={[styles.pannel, {height:isTabletOrMobileDevice ? '100%' : '60%'}]}>
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
                                        <TouchableOpacity onPress={() => {
                                            let codeInput = document.querySelector(`[value="${params.code}"]`);
                                            codeInput.select();
                                            document.execCommand("copy");
                                            pushMessage(`Le code a été copié.`);
                                        }}> 
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
                </View>
            </View>
            {Back &&
                <View style={styles.partend}>
                    <DispAlert
                        quitRoom={quitRoom}
                        message={"Quitter la salle d'attente?"}
                        type='requestHome'
                        dispBack={dispBack}
                    />
                </View>
            }
            {copyarlert &&
                <View style={styles.partend}>
                    <DispAlert
                        quitRoom={quitRoom}
                        message={"Quitter la salle d'attente?"}
                        type='requestHome'
                        dispBack={dispalert}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width:"100%",
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        paddingVertical: 30,
        justifyContent:'center',
        overflow:'hidden',
    },
    pannel:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    containerfirst: {
        height: "100%",
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        overflow:'hidden',
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
    backContainer: {
        position: 'absolute',
        flex:1,
        left:0,
        top:30,
        width: '100%',
        // backgroundColor:'red',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        alignSelf:'center',
    },
    back:{
        marginLeft:30,
    },
    partend: {
        position: 'absolute',
        top: 0,
        left:0,
        flex:1,
        width: '100%',
        height: '100%',
        zIndex:3,
    },
    pageContent: {
        paddingTop: 20,
        flex: 1,
        resizeMode: "cover",
        justifyContent: "space-between",
        alignItems: "center",
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
    backIcon: {
        height: 24,
        width: 30,
        marginLeft:30,
    },
    name: {
        fontFamily: 'SuezOne_400Regular',
    },
    containerportrait:{
        height: "100%",
        width:"100%",
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        overflow:'hidden',
    },
    textportrait:{
        color:"white",
        fontFamily:'Montserrat_700Bold',
        fontSize:24,
        textAlign:"center",
        maxWidth:"80%",
    },
    turnyourdevice:{
        width:70,
        height:70,
        marginBottom:30,
    },
    footer: {
        width: 270
    }
});

export default Room;