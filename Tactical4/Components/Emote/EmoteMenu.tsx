import React from 'react';
import { StyleSheet, View, Image, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

interface Props {
    sendEmote: (emoteID: number) => void,
    setOpen: (open: boolean) => void
}

export const EMOTES = [
    require('./../../assets/emote_happy.png'),
    require('./../../assets/emote_hangry.png'),
    require('./../../assets/emote_sad.png'),
    require('./../../assets/emote_neutral.png')
]

const EmoteMenu = (props: Props) => {
    const {
        sendEmote,
        setOpen
    } = props;

    return (
        <View style={styles.emoteMenu}>
            { EMOTES.map((emote, index) => (
                <TouchableOpacity onPress={() => {
                    setOpen(false)
                    sendEmote(index)
                }} key={index}>
                    <View> 
                        <Image style={styles.emote} source={emote} />
                    </View>
                </TouchableOpacity>
            ))}
            <Image source={require('./../../assets/footDecoration.png')} style={styles.footDecoration}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    emoteMenu: {
        position: 'relative',
        elevation: 100,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
        borderRadius: 12
    },
    emote: {
        height: 32,
        width: 32,
        marginHorizontal: 6
    },
    footDecoration: {
        position: 'absolute',
        top: 42,
        right: 30,
        height: 30,
        width: 30
    }
});

export default EmoteMenu;