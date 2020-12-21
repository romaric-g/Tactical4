import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import Button from '../Components/Button';
import PlayerInfo from '../Components/PlayerInfo';
import Puissance4 from '../Components/puissance4';
import PartyEnd from '../Components/PartyEnd';
import socket from '../connection';
import Models from '../types/models';

const Game = () => {

    const [ gameState, setGameState ] = React.useState<Models.GameState | null>(null)

    React.useEffect(() => {
        socket.emit("GetGameState", null, (res: Models.GetGameStateResponse) => {
            if (res.success && res.state) {
                setGameState(res.state);
            }
        })

        socket.on("GameStateChange", (event: Models.GameStateChangeEvent) => {
            if (event.state) {
                setGameState(event.state)
                console.log(event)
            }
        })


        //setGameState({"currentPlayer":1,"grid":[[],[],[],[],[],[],[],[],[1,2]],"lastPlacement":{"x":8,"y":2},"player1":{"name":"zeaz","id":"i3BsV3ylNjIaldaRAAAt"},"player2":{"name":"FROFN2","id":"ybYGF8FJSp9G8QACAAAr"},"score":[0,0]})
    }, []);

    const currentPlayer = React.useMemo(() => {
        return gameState?.currentPlayer === 1 ? gameState.player1 : gameState?.player2
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

    const win = React.useMemo(() => {
        if(gameState?.me === 1){
            return gameState?.win?.winnerID === gameState?.player1?.id
        }else{
            return gameState?.win?.winnerID === gameState?.player2?.id
        }
        
    }, [gameState])

    if (!gameState) return (
        <ActivityIndicator />
    )

    return (
        <View style={styles.container}>
            <Puissance4 
                grid={gameState.grid} 
                canPlay={canPlay}
                currentPlayer={gameState.currentPlayer}
            />
            <View style={styles.content}>
                <View style={{width: "100%"}}>
                    <PlayerInfo 
                        name={gameState.player1?.name}
                        rank={1}
                        score={gameState.score[0]}
                    />
                    <PlayerInfo 
                        name={gameState.player2?.name}
                        rank={2}
                        score={gameState.score[1]}
                    />
                </View>
                <Image style={styles.image} source={require('./../assets/logo.png')} />
                <Button>Emote</Button>
            </View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#04091B"
    },
    content: {
        height: "100%",
        flex: 1,
        paddingLeft: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    image: {
        width: 77,
        height: 29
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
    }
});

export default Game;