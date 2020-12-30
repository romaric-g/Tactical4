import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FadeInOut from './FadeInOut';

interface Props {
    messages: ChatMessage[]
}

export interface ChatMessage { message: string, created: number }


const Chat = ({ messages } : Props ) => {

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
                            <Text style={styles.text}>{ message.message }</Text>
                        </View>
                    </FadeInOut>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
        color: "white",
        textAlign: 'left',
        fontFamily: 'Montserrat_400Regular',
    }
});

export default Chat;