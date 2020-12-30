import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
    name: string | undefined,
    rank: number,
    score: number,
    color: boolean,
}

const PlayerInfo = (props: Props) => {
    const {
        name,
        rank,
        score,
        color,
    } = props;

    return (
        <View>
            <View style={styles.row}>
                <View style={[styles.square,{backgroundColor:color ? '#FFCF54' : '#3FCA87'}]}>
                    <View style={[styles.squareinner,{backgroundColor:color ? '#DEB449' : '#37B076'}]}></View>
                </View>
                <Text style={styles.name}>
                    {name}
                </Text>
            </View>
            <Text style={styles.score}>{score} pts</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        color: "white",
        fontSize: 24,
        fontFamily: 'Montserrat_700Bold',
    },
    score: {
        color: "white",
        fontSize: 14,
        fontFamily: 'Montserrat_300Light',
        transform:[{translateX: 34}]
    },
    square:{
        width:24,
        height:24,
        borderRadius:24,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
        transform:[{translateY: 3}]
    },
    squareinner:{
        width:15,
        height:15,
        borderRadius:15,
    },
    row: {
        display:'flex',
        flexDirection:'row',
    },
});

export default PlayerInfo;