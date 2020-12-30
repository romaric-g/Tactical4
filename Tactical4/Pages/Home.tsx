import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity, Dimensions, Platform  } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie'
import {bounceInDown, bounceInLeft, bounceInUp} from '../Animations/Animation';
import { useHistory } from 'react-router';
import Button from '../Components/Button';
import '@expo/match-media'
import { useMediaQuery } from "react-responsive";
import DispAlert from '../Components/DispAlert';
import Credits from '../Components/Credits'
import Models from '../types/Models';
import socket from './../connection'
import EmoteButton from '../Components/Emote/EmoteButton';

const logo = require('../assets/logo.png');
ReactGA.initialize('G-HC358Y7S2D');
ReactGA.pageview("Home");

const Home = () => {

    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
        // alternatively...
        query: "(max-device-width: 1224px)"  
    });
    const haveToRotate = useMediaQuery({    
        maxDeviceWidth: 450,
        // alternatively...
        query: "(max-device-width: 450px)"  
    });
    
    
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    const history = useHistory();
    const [Credit, setCredit] = useState(false)

    const [ name, setName ] = React.useState(Cookies.get("name") || "");
    const [ code, setCode ] = React.useState("");
    
    const [maxwidth, setmaxwidth] = useState(false);
    React.useEffect(() => {
        if((Platform.OS != 'android') && (Platform.OS != 'ios')){
            window.addEventListener('resize', (event) => {
                if(window.innerWidth >= 450){
                    setmaxwidth(false);
                }else{
                    setmaxwidth(true);
                }
            });
        }
    },[]);


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
    if (maxwidth) {
        return (
            <View style={styles.containerportrait}>
                <Image style={styles.turnyourdevice} source={require('./../assets/turndevice.gif')} />
                <Text style={styles.textportrait}>Tourne ton écran ou élargis ta fenêtre pour une meilleure expérience.</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Animatable.View animation={bounceInLeft} style={styles.creditContainer}>
                <TouchableOpacity onPress={dispCredit}>
                    <Text style={styles.credit}>Crédits</Text>
                </TouchableOpacity>
            </Animatable.View>
            <View style={[styles.addpadding, {height:isTabletOrMobileDevice? '100%' : '60%'}]}>
                <Animatable.View animation={bounceInDown}>
                    <Image source={logo} style={styles.logo} />
                </Animatable.View>
                <View style={styles.pageContent}>
                    <Animatable.View animation={bounceInDown}>
                        <TextInput
                            style={styles.name}
                            onChangeText={(name) => {
                                Cookies.set('name', name)
                                setName(name)
                            }}
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
    )
}

const styles = StyleSheet.create({
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
    container: {
        height: "100%",
        color: "white",
        // padding: 30,
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        justifyContent:'center',
        // backgroundColor:'green'
        overflow:'hidden',
    },
    //height:isTabletOrMobileDevice? '60%' : '100%'
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