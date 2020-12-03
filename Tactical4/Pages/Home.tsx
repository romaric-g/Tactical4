import React from 'react';
import { StyleSheet, View, TextInput, ImageBackground, Image, Text } from 'react-native';
import Button from '../Components/Button';

const image = require('../assets/tactical4background.png');
const logo = require('../assets/logo.png');

const Home = () => {

    const [ name, setName ] = React.useState("");

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Image source={logo} style={styles.logo} />
                <View style={styles.pageContent}>
                    <TextInput
                        style={{...styles.input, ...styles.name}}
                        onChangeText={setName}
                        value={name}
                        placeholder="Nom"
                        placeholderTextColor="#686D7F"
                        disableFullscreenUI
                    />
                    <View style={styles.footer}>
                        <TextInput
                            style={{...styles.input, ...styles.code}}
                            placeholder="Rejoindre une partie"
                            placeholderTextColor="#686D7F"
                            disableFullscreenUI
                        />
                        <Button>Créer une partie</Button>
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
        width: 200,
        backgroundColor: "#171F3C",
        borderRadius: 14,
        color: "#FFF",
        paddingHorizontal: 20,
        marginBottom: 10,
        fontSize: 18
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

export default Home;