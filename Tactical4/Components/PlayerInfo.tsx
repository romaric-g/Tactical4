import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
    name: string | undefined,
    rank: number,
    score: number
}

const PlayerInfo = (props: Props) => {
    const {
        name,
        rank,
        score
    } = props;

    return (
        <View>
            <Text style={styles.name}>{rank}. {name}</Text>
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
    }
});

export default PlayerInfo;