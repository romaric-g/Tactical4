import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View, StatusBar,ImageBackground } from 'react-native';
import { useFonts } from '@expo-google-fonts/suez-one';
import { SuezOne_400Regular } from '@expo-google-fonts/suez-one';
import { Montserrat_700Bold, Montserrat_300Light, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { NativeRouter, Route, Link } from "react-router-native";
const image = require('./assets/tactical4background.png');
import Home from './Pages/Home';
import Room from './Pages/Room';
import Game from './Pages/Game';
import socket from './connection';
import PartyEndInner from './Components/PartyEndInner'

const App = () => {
  return (
    <NativeRouter>
      <ImageBackground source={image} style={styles.image}>
        <StatusBar hidden />
        <View style={styles.container}>
          <Route exact path="/" component={Home} />
          <Route path="/room/:code" component={Room} />
          <Route path="/game" component={Game} />
        </View>
      </ImageBackground>
    </NativeRouter>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width:'100%',
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  bgapp: {
    backgroundColor:'rgba(4, 9, 27, 1)',
    overflow:'hidden',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04091B',
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
});

export default App;