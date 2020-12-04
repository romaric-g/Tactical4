import React, { useCallback } from 'react';
import { StyleSheet, View, TextInput, ImageBackground, Image, Text, TouchableOpacity  } from 'react-native';
import { useHistory, useParams, withRouter } from 'react-router-native';
import Button from '../Components/Button';
import socket from '../connection';
import Models from '../types/models';

const image = require('../assets/tactical4background.png');
const logo = require('../assets/logo.png');

const Room = () => {
    const history = useHistory();

    const params = useParams() as {[key: string]: string};
    const [ playersName, setPlayersName ] = React.useState<(string | undefined)[]>([]);

    React.useEffect(() => {
        
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
    }, [canStart])
    
    const focusTextInput = React.useCallback( () => {
        console.log(textRef.current.value);
    },[textRef]
    );
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Image source={logo} style={styles.logo} />
                <View style={styles.pageContent}>
                    <View>
                        <Text style={styles.counterPlayer}>Joueurs [{playersName.length}/2]</Text>
                        {playersName.map((playerName, index) => 
                            <Text key={index} style={styles.playerName}>{(playerName || "?")}</Text>
                        )}
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.containerInput}>
                            <TouchableOpacity onPress={focusTextInput} style={{...styles.input, ...styles.code}}> 
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
                                <Image
                                    resizeMode="contain"
                                    style={styles.shareIcon} 
                                    source={require('../assets/share.png')}
                                />
                            </View>
                        </View>
                        <Button onPress={startRoom}>{ !canStart ? "Joueur en attente..." : "Lancer la partie"}</Button>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: "100%"
    },
    image: {
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