import React from 'react';
import { StyleSheet, View, TextInput, ImageBackground, Image, Text } from 'react-native';
import { useHistory } from 'react-router';
import Button from '../Components/Button';
import Models from '../types/models';
import socket from './../connection';

const image = require('../assets/tactical4background.png');
const logo = require('../assets/logo.png');

const Home = () => {

    const history = useHistory();

    const [ name, setName ] = React.useState("");
    const [ code, setCode ] = React.useState("");

    const joinRoom = React.useCallback(() => {
        const joinRoomParams: Models.JoinRoomParams = {
            settings: {
                name: name
            },
            code: code
        } 
        socket.emit('JoinRoom', joinRoomParams, joinRoomResponse)
    }, [name, code])

    const joinRoomResponse = React.useCallback((res: Models.SocketResponse) => {
        if (res.success) {
            console.log('SUCCESS')
            history.push(`/room/${code}`)
        } else {
            console.log("ERROR")
            console.log(res)
        }
    }, [code])

    const createRoom = React.useCallback(() => {
        const createRoomParams: Models.CreateRoomParams = {
            settings: {
                name: name
            }
        } 
        socket.emit('CreateRoom', createRoomParams, createRoomResponse)
    }, [name])

    const createRoomResponse = React.useCallback((res: Models.CreateRoomResponse) => {
        if(res.success) {
            console.log(res)
            history.push(`/room/${res.code}`)
        } else {
            console.log("ERROR")
            console.log(res)
        }
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Image source={logo} style={styles.logo} />
                <View style={styles.pageContent}>
                    <TextInput
                        style={styles.name}
                        onChangeText={setName}
                        value={name}
                        placeholder="Nom"
                        placeholderTextColor="#686D7F"
                        disableFullscreenUI
                    />
                    <View style={styles.footer}>
                        <TextInput
                            style={styles.code}
                            onChangeText={setCode}
                            onSubmitEditing={joinRoom}
                            value={code}
                            placeholder="Rejoindre une partie"
                            placeholderTextColor="#686D7F"
                            disableFullscreenUI
                        />
                        <Button onPress={createRoom} >Créer une partie</Button>
                    </View>
                </View>
            </ImageBackground>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      color: "white"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      alignItems: "center",
      padding: 30
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
    name: {
        height: 50,
        textAlign: "center",
        width: 200,
        backgroundColor: "#171F3C",
        borderRadius: 14,
        color: "#FFFFFF",
        paddingHorizontal: 20,
        marginBottom: 10,
        fontSize: 18,
        fontFamily: 'SuezOne_400Regular',
    },
    code: {
        height: 50,
        backgroundColor: "#171F3C",
        borderRadius: 14,
        color: "#FFFFFF",
        paddingHorizontal: 20,
        marginBottom: 10,
        fontSize: 18,
        width: "100%"
    },
    footer: {
        width: 270
    }
});

export default Home;