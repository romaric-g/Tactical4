import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Button from '../Components/Button';
import PlayerInfo from '../Components/PlayerInfo';
import Puissance4 from '../Components/puissance4';

const Game = () => {
    return (
        <View style={styles.container}>
            <Puissance4 />
            <View style={styles.content}>
                <View style={{width: "100%"}}>
                    <PlayerInfo 
                        name="Albert"
                        rank={1}
                        score={1200}
                    />
                    <PlayerInfo 
                        name="Remi"
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