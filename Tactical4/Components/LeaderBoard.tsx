import React from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { bounceInRight } from '../Animations/Animation';
import Models from '../types/Models';
import PlayerInfo from './PlayerInfo';

interface Props {
    winnerName: string,
    winnerScore: number,
    loserName: string,
    loserScore: number
}

const LeaderBoard = (props : Props) => {
    const { 
        winnerName, winnerScore, loserName, loserScore 
    } = props;

    return (
        <View style={{width: "100%",marginTop:15,}}>
            <Animatable.View animation={bounceInRight}>
                <PlayerInfo 
                    name={winnerName}
                    rank={1}
                    score={winnerScore}
                />
            </Animatable.View>
            <Animatable.View animation={bounceInRight}>
                <PlayerInfo 
                    name={loserName}
                    rank={2}
                    score={loserScore}
                />
            </Animatable.View>
        </View>
    )
}

export default LeaderBoard;