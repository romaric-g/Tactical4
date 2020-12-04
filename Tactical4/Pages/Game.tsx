import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import Button from '../Components/Button';
import PlayerInfo from '../Components/PlayerInfo';
import Puissance4 from '../Components/puissance4';
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
    }, []);

    const currentPlayer = React.useMemo(() => {
        return gameState?.currentPlayer === 1 ? gameState.player1 : gameState?.player2
    }, [gameState])

    const canPlay = React.useMemo(() => {
        return currentPlayer?.id === socket.id;
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
                        score={1200}
                    />
                    <PlayerInfo 
                        name={gameState.player2?.name}
                        rank={2}
                        score={350}
                    />
                </View>
                <Image style={styles.image} source={require('./../assets/logo.png')} />
                <Button>Emote</Button>
            </View>
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
    }
});

export default Game;