import React from 'react';
import { StyleSheet, View, TextInput, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
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
                        maxLength={10}
                    />
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={joinRoom}>
                            <View style={[styles.submitArrow, {
                                transform: [{ translateY: 35 }]
                            }]}>
                                <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.2116 9.70815L4.7949 2.70815C4.60945 2.63767 4.40305 2.61112 4.19967 2.6316C3.99629 2.65207 3.80428 2.71872 3.64592 2.82381C3.48756 2.9289 3.36936 3.06812 3.30505 3.2253C3.24073 3.38247 3.23294 3.55116 3.28257 3.71177L4.59557 7.95465L13.0001 10.5L4.59557 13.0454L3.28257 17.2883C3.232 17.449 3.23915 17.618 3.30316 17.7756C3.36718 17.9332 3.48543 18.0728 3.64407 18.1781C3.80272 18.2833 3.9952 18.3499 4.199 18.3701C4.4028 18.3903 4.60949 18.3631 4.7949 18.2919L23.2116 11.2919C23.3977 11.2212 23.555 11.1092 23.6653 10.969C23.7755 10.8288 23.834 10.6661 23.834 10.5C23.834 10.3339 23.7755 10.1713 23.6653 10.031C23.555 9.8908 23.3977 9.77881 23.2116 9.70815Z" fill="white"/>
                                </svg>
                            </View>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.code}
                            onChangeText={setCode}
                            onSubmitEditing={joinRoom}
                            value={code}
                            maxLength={6}
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
    submitArrow: {
        marginLeft: '80%',
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