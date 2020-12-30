import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { bounceInUp, fadeIn400 } from '../Animations/Animation';
import Button from './Button';

interface Props {
    Close?: any,
}

const Rules = ({Close}: Props) => {
    return (
        <View style={styles.Container}>
            <Animatable.View animation={fadeIn400} style={styles.Bg}></Animatable.View>
            <Animatable.View animation={bounceInUp} style={styles.Box}>
                <Image style={styles.Logo} source={require('./../assets/logo.png')} />
                <View style={styles.retour}>
                    <Button onPress={Close}>Retour</Button>
                </View>
                <View style={styles.MessageContainer}>
                    <Text style={styles.Titre1}>Règles du jeu</Text>
                    <Text style={styles.Titre2}>Pour jouer au Tactical 4, il vous faut :</Text>
                    <Text style={styles.Paragraphe}>- Être 2 joueurs. - Être Connecté sur l'application web, android ou ios. - S'être partagé le code partie et s'y être connecté.</Text>
                    <Text style={styles.Titre2}>Commencer une partie de Tactical 4 :</Text>
                    <Text style={styles.Paragraphe}>Pour commencer une partie de Tactical 4, l'application désigne le premier joueur.</Text>
                    <Text style={styles.Paragraphe}>Celui-­ci met un de ses jetons de couleur dans l'une des colonnes de son choix. Le jeton tombe alors en bas de la colonne.</Text>
                    <Text style={styles.Paragraphe}>Le deuxième joueur insère à son tour son jeton, de l'autre couleur dans la colonne de son choix.</Text>
                    <Text style={styles.Paragraphe}>Et ainsi de suite jusqu'à obtenir une rangée de 4 jetons de même couleur.</Text>
                    <Text style={styles.Titre2}>Comment gagner une partie de Tactical 4 :</Text>
                    <Text style={styles.Paragraphe}>Pour gagner une partie de Tactical 4, il suffit d'être le premier à aligner 4 jetons de sa couleur horizontalement, verticalement et diagonalement.</Text>
                    <Text style={styles.Paragraphe}>Si lors d'une partie, tous les jetons sont joués sans qu'il y est d'alignement de jetons, la partie est déclaré nulle.</Text>
                </View>
            </Animatable.View>
        </View>
    )
}

var styles = StyleSheet.create({
    Container: {
        flex:1,
        height:'100%',
        width:'100%',
        // padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        top:0,
        left:0,
        justifyContent:'center',
    },
    Bg: {
        flex:1,
        position: 'absolute',
        top: 0,
        left:0,
        width: '100%',
        minHeight: '100%',
        backgroundColor:'rgba(4, 9, 27, 0.96)',
        opacity:0.96,
        resizeMode:'contain',
    },
    Logo: {
        display:'flex',
        width: 144,
        height: 48,
        resizeMode:'contain',
    },
    Buttons: {
        display:'flex',
        flexDirection: 'row',
    },
    retour:{
        marginTop: 30,
    },
    Button1: {
        marginRight:7,
    },
    Button2: {
        marginLeft:7,
    },
    Box: {
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        // backgroundColor:'#131829',
        padding:30,
        borderRadius:14,
        overflow: 'scroll',
        minHeight:'100%',
        height:'100%'
    },
    Titre1: {
        color: "#FFFFFF",
        fontSize: 36,
        width: "80%",
        textAlign:'center',
        fontFamily:'SuezOne_400Regular',
    },
    Titre2: {
        color: "#FFFFFF",
        fontSize: 24,
        width: "80%",
        fontFamily:'Montserrat_700Bold',
        marginTop:30,
    },
    Paragraphe: {
        color: "#FFFFFF",
        fontSize: 18,
        width: "80%",
        fontFamily:'Montserrat_400Regular',
        marginTop:30,
    },
    MessageContainer:{
        marginTop: 30,
        marginBottom: 30,
        display:'flex',
        alignItems:'center',
    },
});

export default Rules;