import React, { RefObject } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { bounceInRight } from '../Animations/Animation';
import socket from '../connection';
import Models from '../types/Models';
import EmoteDisplay, { EmoteDisplayRef } from './Emote/EmoteDisplay';
import PlayerInfo from './PlayerInfo';

interface Props {
    gameState: Models.GameState | null
}

const LeaderBoard = (props : Props) => {
    const { 
        gameState
    } = props;

    const winnerIndex = React.useMemo(() => {
        if (gameState?.score) {
            return gameState?.score[0] > gameState?.score[1] ? 0 : 1;
        } else {
            return 0;
        }
    }, [gameState])

    const winnerName = React.useMemo(() => {
        return winnerIndex === 0 ? gameState?.player1?.name : gameState?.player2?.name;
    }, [gameState])

    const loserName = React.useMemo(() => {
        return winnerIndex === 0 ? gameState?.player2?.name : gameState?.player1?.name;
    }, [gameState])

    const winnercolor = React.useMemo(() => {
        return winnerIndex === 0 ? true : false
    }, [gameState])

    const losercolor = React.useMemo(() => {
        return winnerIndex === 0 ? false : true
    }, [gameState])

    const refPlayer1 = React.useRef<EmoteDisplayRef>(null)
    const refPlayer2 = React.useRef<EmoteDisplayRef>(null)

    React.useEffect(() => {
        
        const newEmoteSended = (event: Models.NewEmoteSendedEvent) => {
            console.log(event)
            
            if (gameState?.player1?.id === event.senderID) {
                refPlayer1.current?.showEmote(event.emoteID)
            } else if(gameState?.player2?.id === event.senderID) {
                refPlayer2.current?.showEmote(event.emoteID)
            }
        }

        socket.on("NewEmoteSended", newEmoteSended);

        return () => {
            socket.off("NewEmoteSended", newEmoteSended);
        }
    }, [])

    return (
        <View style={{width: "100%",marginTop:65,transform:[{translateX:-30}]}}>
        {/* <View style={{width: "100%",marginTop:15,transform:[{translateX:-30}]}}> */}
            <Animatable.View style={{ display: 'flex', flexDirection: 'row'}} animation={bounceInRight}>
                <EmoteDisplay ref={winnerIndex === 0 ? refPlayer1 : refPlayer2} />
                <PlayerInfo 
                    name={winnerName}
                    rank={1}
                    score={gameState?.score[winnerIndex] || 0}
                    color={winnercolor}
                />
            </Animatable.View>
            <Animatable.View style={{ display: 'flex', flexDirection: 'row', marginTop: 10}} animation={bounceInRight}>
                <EmoteDisplay ref={winnerIndex === 1 ? refPlayer1 : refPlayer2} />
                <PlayerInfo 
                    name={loserName}
                    rank={2}
                    score={gameState?.score[( winnerIndex === 0 ? 1 : 0 )] || 0}
                    color={losercolor}
                />
            </Animatable.View>
        </View>
    )
}

export default LeaderBoard;