import React, { useCallback } from 'react';
import { StyleSheet, View, TextInput, ImageBackground, Image, Text, TouchableOpacity  } from 'react-native';
import { withRouter } from 'react-router-native';
import Button from '../Components/Button';

const image = require('../assets/tactical4background.png');
const logo = require('../assets/logo.png');


const Room = () => {

    const [ GameId, setGameId ] = React.useState("DHJXNJ");
    const [ Copied, setCopied ] = React.useState(false);
    const textRef = React.useRef<TextInput>(null);

    
    const focusTextInput = React.useCallback( () => {
        console.log(textRef.current.value);
    },[textRef]
    );
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Image source={logo} style={styles.logo} />
                <View style={styles.pageContent}>
                    <Text style={styles.counterPlayer}>Joueur[1/2]</Text>
                    <Text style={styles.playerName}>Titouan</Text>
                    <View style={styles.footer}>
                        <View style={styles.containerInput}>
                            <TouchableOpacity onPress={focusTextInput} style={{...styles.input, ...styles.code}}> 
                                <TextInput
                                    style={{...styles.input, ...styles.code}}
                                    placeholder={GameId}
                                    placeholderTextColor="#686D7F"
                                    value = {GameId}
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
                        <Button>Joueur en attente...</Button>
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
        width: 270,
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
    code: {
        width: "100%"
    },
    footer: {
        width: 270
    }
});

export default Room;