import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, TouchableOpacity, BackHandler, Text, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {bounceInDown, bounceInUp, bounceInRight, bounceInLeft, fadeIn400, bounceInRightYourTurn, fadeIn400YourTurn, minify} from '../Animations/Animation';
import Button from '../Components/Button';
import PlayerInfo from '../Components/PlayerInfo';
import '@expo/match-media'
import { useMediaQuery } from "react-responsive";
import Puissance4 from '../Components/Puissance4';
import PartyEnd from '../Components/PartyEnd';
import DispAlert from '../Components/DispAlert';
import MenuInGame from '../Components/MenuInGame'
import socket from '../connection';
import Models from '../types/Models';
import { LinearGradient } from 'expo-linear-gradient';
import { useHistory } from 'react-router';

const Game = () => {

    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
        // alternatively...
        query: "(max-device-width: 1224px)"  
    });
    const haveToRotate = useMediaQuery({    
        maxDeviceWidth: 650,
        // alternatively...
        query: "(max-device-width: 650px)"  
    });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    const history = useHistory();

    const [ gameState, setGameState ] = React.useState<Models.GameState | null>(null)
    const [Menu, setMenu] = useState(false)
    const [Back, setBack] = useState(false)

    React.useEffect(() => {
        if((Platform.OS != 'android') && (Platform.OS != 'ios')){
            window.history.pushState(null, document.title, window.location.href);
            window.addEventListener('popstate', function (event){
                window.history.pushState(null, document.title,  window.location.href);
                if(!Menu && !gameState?.win){
                    setBack(true)
                }
            });
        }

        socket.emit("GetGameState", null, (res: Models.GetGameStateResponse) => {
            if (res.success && res.state) {
                setGameState(res.state);
                console.log(res.state)
            }
        })

        const gameStateChange = (event: Models.GameStateChangeEvent) => {
            if (event.state) {
                setGameState(event.state)
                console.log(event)
            }
        }

        const newEmoteSended = (event: Models.NewEmoteSendedEvent) => {
            console.log(event)
            // TODO: afficher l'emote
        }

        socket.on("GameStateChange", gameStateChange);
        socket.on("NewEmoteSended", newEmoteSended);

        return () => {
            socket.off("GameStateChange", gameStateChange);
            socket.off("NewEmoteSended", newEmoteSended);
        }

        //setGameState({"currentPlayer":1,"grid":[[],[],[],[],[],[],[],[],[1,2]],"lastPlacement":{"x":8,"y":2},"player1":{"name":"zeaz","id":"i3BsV3ylNjIaldaRAAAt"},"player2":{"name":"FROFN2","id":"ybYGF8FJSp9G8QACAAAr"},"score":[0,0]})
    }, []);

    const sendEmote = React.useCallback((emoteID: number) => {
        const SendEmoteParams : Models.SendEmoteParams = { emoteID };
        socket.emit("SendEmote", SendEmoteParams, (e: Models.SocketResponse) => { console.log(e) })
    }, [])

    const quitRoom = React.useCallback(() => {
        console.log("QuitRoom")
        socket.emit("QuitRoom", null, (e: Models.SocketResponse) => { console.log(e) })
        history.push("/")
    }, []);

    const currentPlayer = React.useMemo(() => {
        return gameState?.currentPlayer === 1 ? gameState.player1 : gameState?.player2
    }, [gameState])

    const playnow = React.useMemo(() => {
        return gameState?.currentPlayer === gameState?.me ? true : false
    }, [gameState])

    const canPlay = React.useMemo(() => {
        return currentPlayer?.id === socket.id;
    }, [gameState])

    const winner = React.useMemo(() => {
        return gameState?.win?.winnerID === gameState?.player1?.id ? gameState?.player1?.name : gameState?.player2?.name
     }, [gameState])

    const loser = React.useMemo(() => {
        return gameState?.win?.winnerID === gameState?.player1?.id ? gameState?.player2?.name : gameState?.player1?.name
    }, [gameState])

    const winnerScore = React.useMemo(() => {
        return gameState?.win?.winnerID === gameState?.player1?.id ? gameState?.score[0] : gameState?.score[1]
    }, [gameState])

    const loserScore = React.useMemo(() => {
        return gameState?.win?.winnerID === gameState?.player1?.id ? gameState?.score[1] : gameState?.score[0]
    }, [gameState])

    const dispMenu = () => {
        setMenu(!Menu)
    };
    const dispBack = () => {
        setBack(!Back)
    };

    const win = React.useMemo(() => {
        if(gameState?.me === 1){
            return gameState?.win?.winnerID === gameState?.player1?.id
        }else{
            return gameState?.win?.winnerID === gameState?.player2?.id
        }
        
    }, [gameState])

    useEffect(() => {
        const backAction = () => {
          return false;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
    }, []);

    if (!gameState) return (
        <ActivityIndicator />
    )
    if (haveToRotate || isPortrait) {
        return (
            <View style={styles.containerportrait}>
                <Image style={styles.turnyourdevice} source={require('./../assets/turndevice.gif')} />
                <Text style={styles.textportrait}>Tourne ton écran ou élargis ta fenêtre pour une meilleure expérience.</Text>
            </View>
        )
    }
    if (isTabletOrMobileDevice) {
        return (
            <View style={styles.containerfirst}>
                <View style={styles.container}>
                    <View style={styles.addpadding}>
                        <Animatable.View key={1} animation={bounceInRight} style={styles.contentpuissance4}>
                            <Puissance4
                                key={1000}
                                grid={gameState.grid} 
                                canPlay={canPlay}
                                currentPlayer={gameState.currentPlayer}
                            />
                        </Animatable.View>
                        <View style={styles.content}>
                            <View style={{width: "100%"}}>
                                <Animatable.View animation={bounceInLeft}>
                                    <TouchableOpacity onPress={dispMenu} style={styles.menuButton}>
                                        <LinearGradient style={styles.linearGradient} colors={['#72FFBB', '#008A48']} >
                                            <View style={styles.menuBarContent}>
                                                <View style={styles.menuBar1}></View>
                                                <View style={styles.menuBar2}></View>
                                                <View style={styles.menuBar1}></View>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animatable.View>
                                {gameState.score[0] >= gameState.score[1] &&
                                    <View style={{width: "100%",marginTop:15,}}>
                                        <Animatable.View animation={bounceInRight}>
                                            <PlayerInfo 
                                                name={gameState.player1?.name}
                                                rank={1}
                                                score={gameState.score[0]}
                                            />
                                        </Animatable.View>
                                        <Animatable.View animation={bounceInRight}>
                                            <PlayerInfo 
                                                name={gameState.player2?.name}
                                                rank={2}
                                                score={gameState.score[1]}
                                            />
                                        </Animatable.View>
                                    </View>
                                }
                                {gameState.score[0] < gameState.score[1] &&
                                    <View style={{width: "100%",marginTop:15,}}>
                                        <Animatable.View animation={bounceInRight}>
                                            <PlayerInfo 
                                                name={gameState.player2?.name}
                                                rank={2}
                                                score={gameState.score[1]}
                                            />
                                        </Animatable.View>
                                        <Animatable.View animation={bounceInRight}>
                                            <PlayerInfo 
                                                name={gameState.player1?.name}
                                                rank={1}
                                                score={gameState.score[0]}
                                            />
                                        </Animatable.View>
                                    </View>
                                }
                            </View>
                            <View style={styles.emoteButtonContainer}>
                                <Animatable.View animation={bounceInUp}>
                                    <Button>Emote</Button>
                                </Animatable.View>
                            </View>
                        </View>
                    </View>
                </View>
                {playnow &&
                    <View pointerEvents='none' style={styles.yourTurn}>
                        <Animatable.View animation={fadeIn400YourTurn} duration={3500} style={styles.yourTurnBg}>
                        </Animatable.View>
                        <View style={styles.yourTurnContent}>
                            <Animatable.View animation={bounceInRightYourTurn} duration={3000}>
                                <Image style={styles.you} source={require('./../assets/you.png')} />
                            </Animatable.View>
                            <Animatable.View animation={bounceInRightYourTurn} duration={3500}>
                                <Text style={styles.yourTurnText}>À TOI DE JOUER !</Text>
                            </Animatable.View>
                        </View>
                    </View>
                }
                {gameState.win &&
                    <View style={styles.partend}>
                        <PartyEnd
                        Winner={winner}
                        Loser={loser}
                        WinnerScore= {winnerScore}
                        LoserScore= {loserScore}
                        Win ={win}
                        />
                    </View>
                }
                {Menu &&
                    <View style={styles.partend}>
                        <MenuInGame
                            menuProp={Menu}
                            quitRoom={quitRoom}
                            dispMenu={dispMenu}
                        />
                    </View>
                }
                {!gameState.win && !Menu && Back &&
                    <View style={styles.partend}>
                        <DispAlert
                            message={"Quitter la partie en cours?"}
                            type="requestHome"
                            quitRoom={quitRoom}
                            dispBack={dispBack}
                        />
                    </View>
                }
                {gameState.leave &&
                    <View style={styles.partend}>
                        <DispAlert
                            message={"Votre adversaire a quitter la partie"}
                            type="forceHome"
                            quitRoom={quitRoom}
                            dispBack={dispBack}
                        />
                    </View>
                }
            </View>
        )
    }
    // <Animatable.View key={1} animation={bounceInRight} style={[styles.contentpuissance4, {transform: [{ translateY: -45 }]} ]}></Animatable.View>
    return (
        <View style={styles.containerfirst}>
            <View style={styles.containercomputer}>
                <View style={styles.addpaddingcomputer}>
                    <Animatable.View key={1} animation={bounceInRight} style={styles.contentpuissance4}>
                        <Puissance4
                            key={1000}
                            grid={gameState.grid} 
                            canPlay={canPlay}
                            currentPlayer={gameState.currentPlayer}
                        />
                    </Animatable.View>
                    <View style={styles.content}>
                        <View style={{width: "100%"}}>
                            <Animatable.View animation={bounceInLeft}>
                                <TouchableOpacity onPress={dispMenu} style={styles.menuButton}>
                                    <LinearGradient style={styles.linearGradient} colors={['#72FFBB', '#008A48']} >
                                        <View style={styles.menuBarContent}>
                                            <View style={styles.menuBar1}></View>
                                            <View style={styles.menuBar2}></View>
                                            <View style={styles.menuBar1}></View>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Animatable.View>
                            {gameState.score[0] >= gameState.score[1] &&
                                <View style={{width: "100%",marginTop:15,}}>
                                    <Animatable.View animation={bounceInRight}>
                                        <PlayerInfo 
                                            name={gameState.player1?.name}
                                            rank={1}
                                            score={gameState.score[0]}
                                        />
                                    </Animatable.View>
                                    <Animatable.View animation={bounceInRight}>
                                        <PlayerInfo 
                                            name={gameState.player2?.name}
                                            rank={2}
                                            score={gameState.score[1]}
                                        />
                                    </Animatable.View>
                                </View>
                            }
                            {gameState.score[0] < gameState.score[1] &&
                                <View style={{width: "100%",marginTop:15,}}>
                                    <Animatable.View animation={bounceInRight}>
                                        <PlayerInfo 
                                            name={gameState.player2?.name}
                                            rank={2}
                                            score={gameState.score[1]}
                                        />
                                    </Animatable.View>
                                    <Animatable.View animation={bounceInRight}>
                                        <PlayerInfo 
                                            name={gameState.player1?.name}
                                            rank={1}
                                            score={gameState.score[0]}
                                        />
                                    </Animatable.View>
                                </View>
                            }
                        </View>
                        <View style={styles.emoteButtonContainer}>
                            <Animatable.View animation={bounceInUp}>
                                <Button>Emote</Button>
                            </Animatable.View>
                        </View>
                    </View>
                </View>
            </View>
            {playnow &&
                <View pointerEvents='none' style={styles.yourTurn}>
                    <Animatable.View animation={fadeIn400YourTurn} duration={3500} style={styles.yourTurnBg}>
                    </Animatable.View>
                    <View style={styles.yourTurnContent}>
                        <Animatable.View animation={bounceInRightYourTurn} duration={3000}>
                            <Image style={styles.you} source={require('./../assets/you.png')} />
                        </Animatable.View>
                        <Animatable.View animation={bounceInRightYourTurn} duration={3500}>
                            <Text style={styles.yourTurnText}>À TOI DE JOUER !</Text>
                        </Animatable.View>
                    </View>
                </View>
            }
            {gameState.win &&
                <View style={styles.partend}>
                    <PartyEnd
                    Winner={winner}
                    Loser={loser}
                    WinnerScore= {winnerScore}
                    LoserScore= {loserScore}
                    Win ={win}
                    />
                </View>
            }
            {Menu &&
                <View style={styles.partend}>
                    <MenuInGame
                        menuProp={Menu}
                        quitRoom={quitRoom}
                        dispMenu={dispMenu}
                    />
                </View>
            }
            {!gameState.win && !Menu && Back &&
                <View style={styles.partend}>
                    <DispAlert
                        message={"Quitter la partie en cours?"}
                        type="requestHome"
                        quitRoom={quitRoom}
                        dispBack={dispBack}
                    />
                </View>
            }
            {gameState.leave &&
                <View style={styles.partend}>
                    <DispAlert
                        message={"Votre adversaire a quitter la partie"}
                        type="forceHome"
                        quitRoom={quitRoom}
                        dispBack={dispBack}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#04091B",
        width:'100%',
        color: "white",
        flex: 1,
        resizeMode: "cover",
    },
    containerportrait:{
        height: "100%",
        width:"100%",
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
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
    containercomputer: {
        height: "100%",
        width:'100%',
        color: "white",
        // padding: 30,
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        justifyContent:'center',
        // backgroundColor:'green'
    },
    addpaddingcomputer:{
        paddingVertical: 150,
        paddingHorizontal: 30,
        display:'flex',
        flexDirection:'row',
        height:'100%',
        width:'100%',
        alignItems: "center"
    },
    containerfirst: {
        height: "100%",
        width:'100%',
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
    },
    contentpuissance4:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    addpadding:{
        padding: 30,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#04091B",
        width:'100%',
        color: "white",
        flex: 1,
        resizeMode: "cover",
    },
    menuButton: {
        marginLeft:'auto',
        marginRight:0,
    },
    menuBar1:{
        width: 25,
        height: 2.5,
        backgroundColor:'#fff',
        borderRadius: 1.25,
    },
    menuBar2:{
        borderRadius: 1.25,
        width: 25,
        height: 2.5,
        backgroundColor:'#fff',
        marginLeft:15,
        marginTop:6,
        marginBottom:6,
    },
    menuBarContent:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    you:{
        width:78,
        height:63,
    },
    content: {
        height: "100%",
        flex: 0.5,
        paddingLeft: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    image: {
        width: 144,
        height: 48,
        resizeMode:'contain',
    },
    emote: {
        width: 100,
        height: 40
    },
    partend: {
        position: 'absolute',
        top: 0,
        left:0,
        width: '100%',
        height: '100%',
    },
    yourTurn: {
        // pointerEvents:'none',
        position:'absolute',
        top: 0,
        left:0,
        flex:1,
        height: '100%',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
    },
    yourTurnBg: {
        position: 'absolute',
        top: 0,
        left:0,
        width: '100%',
        height: '100%',
        flex:1,
        backgroundColor:'rgba(4, 9, 27, 0.96)',
    },
    yourTurnText:{
        color: "#FFFFFF",
        marginTop: 15,
        fontSize: 36,
        textAlign:'center',
        fontFamily: 'Montserrat_700Bold',
    },
    yourTurnContent: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        width: '100%',
        height: '100%',
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop:15,
        paddingBottom:15,
        borderRadius: 20,
        width: 75,
        height: 50,
        justifyContent:'center',
        alignItems:'center',
    },
    emoteButtonContainer:{
    },
});

export default Game;