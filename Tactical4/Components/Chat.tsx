import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FadeInOut from './FadeInOut';

interface Props {
    messages: ChatMessage[],
    couleur?: boolean,
}

export interface ChatMessage { message: string, created: number, couleur?: boolean, }


const Chat = ({ messages, couleur } : Props ) => {

    const [ date, setDate ] = React.useState(Date.now());

    React.useEffect(() => {
        console.log("useEffect")
        var clock: undefined | number = undefined;

        const updateDateLater = () => {
            setDate(Date.now())
            clock = setTimeout(updateDateLater, 1000);
        }
        updateDateLater()
        
        return () => clearTimeout(clock);
    }, [])

    return (
        <View style={styles.container}>
            {
                messages.map((message, index) => (
                    <FadeInOut key={index} isVisible={( date - message.created ) < 3000} >
                        <View style={styles.messageBox}>
                            <Text style={[styles.text, {color:couleur ? "red" : "white"}]}>{ message.message }</Text>
                        </View>
                    </FadeInOut>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex:2,
        position: 'absolute',
        left: 0,
        bottom: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    messageBox: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingVertical: 5,
        paddingHorizontal: 30,
        textAlign: 'left'
    },
    text: {
        textAlign: 'left',
        fontFamily: 'Montserrat_400Regular',
    }
});

export default Chat;