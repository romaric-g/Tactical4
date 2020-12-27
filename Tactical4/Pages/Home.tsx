import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity, Dimensions  } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {bounceInDown, bounceInLeft, bounceInUp} from '../Animations/Animation';
import { useHistory } from 'react-router';
import Button from '../Components/Button';
import DispAlert from '../Components/DispAlert';
import Credits from '../Components/Credits'
import Models from '../types/Models';
import socket from './../connection'

const logo = require('../assets/logo.png');

const Home = () => {

    const history = useHistory();
    const [Credit, setCredit] = useState(false)

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
    const dispCredit= () => {
        setCredit(!Credit)
    };
    return (
        <View style={styles.container}>
            <Animatable.View animation={bounceInLeft} style={styles.creditContainer}>
                <TouchableOpacity onPress={dispCredit}>
                    <Text style={styles.credit}>Crédits</Text>
                </TouchableOpacity>
            </Animatable.View>
            <View style={styles.addpadding}>
                <Animatable.View animation={bounceInDown}>
                    <Image source={logo} style={styles.logo} />
                </Animatable.View>
                <View style={styles.pageContent}>
                    <Animatable.View animation={bounceInDown}>
                        <TextInput
                            style={styles.name}
                            onChangeText={setName}
                            value={name}
                            placeholder="Nom"
                            placeholderTextColor="#686D7F"
                            disableFullscreenUI
                            maxLength={10}
                        />
                    </Animatable.View>
                    <Animatable.View animation={bounceInUp}>
                        <View style={styles.footer}>
                            <TextInput
                                style={styles.code}
                                onChangeText={(text) => setCode(text.toUpperCase())}
                                autoCapitalize="characters"
                                onSubmitEditing={joinRoom}
                                value={code}
                                maxLength={6}
                                placeholder="Rejoindre une partie"
                                placeholderTextColor="#686D7F"
                                disableFullscreenUI
                            />
                            <TouchableOpacity onPress={joinRoom}>
                                <View style={styles.submitArrow}>
                                    <Image style={styles.arrow} source={require('./../assets/arrowsend.png')} />
                                </View>
                            </TouchableOpacity>
                            <Button onPress={createRoom} >Créer une partie</Button>
                        </View>
                    </Animatable.View>
                </View>
            </View>
            {/* <View style={styles.partend}>
                <DispAlert
                Message={"Ton adversaire a quitté la partie."}
                GoHome={true}
                />
            </View> */}

            {Credit &&
                <View style={styles.partend}>
                    <Credits
                    Close={dispCredit}
                    />
                </View>
            }
        </View>
        // "MjczOTE0NzM2ODA1MTUwNzMx.XzBbuQ.5qp_vG4HsWgviy25Opt9MlVTQX0"
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        color: "white",
        // padding: 30,
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        // backgroundColor:'green'
    },
    addpadding:{
        padding: 30,
        height:'100%',
        alignItems: "center"
    },
    arrow:{
        width:26,
        height:21,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
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
    creditContainer: {
        position: 'absolute',
        flex:1,
        left:0,
        width: '100%',
        height: '100%',
        // backgroundColor:'red',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        alignSelf:'center',
    },
    credit:{
        fontSize: 24,
        fontFamily: 'SuezOne_400Regular',
        color: "#FFFFFF",
        marginBottom:20,
        marginRight:30,
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
        position:'absolute',
        transform: [{ translateY: -45 }],
    },
    code: {
        height: 50,
        backgroundColor: "#171F3C",
        borderRadius: 14,
        color: "#FFFFFF",
        paddingHorizontal: 20,
        marginBottom: 10,
        fontSize: 17,
        width: "100%",
        fontFamily: 'Montserrat_400Regular',
    },
    footer: {
        width: 270
    },
    partend: {
        // display:'none',
        position: 'absolute',
        top: 0,
        left:0,
        width: '100%',
        height: '100%',
    }
});

export default Home;