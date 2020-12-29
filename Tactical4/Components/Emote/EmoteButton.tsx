import React from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import { bounceInUp } from '../../Animations/Animation';
import Button from '../Button';
import EmoteMenu from './EmoteMenu';

interface Props {
    sendEmote: (emoteID: number) => void
}

const EmoteButton = (props: Props) => {
    const {
        sendEmote
    } = props;
    
    const [ open, setOpen ] = React.useState(false);

    return (
        <View style={styles.emoteButtonContainer}>
            <Animatable.View animation={bounceInUp}>
                <Button onPress={() => setOpen(!open)}>Emote</Button>
            </Animatable.View>
            { open && (
                <View style={styles.emoteMenuPosition}>
                    <EmoteMenu sendEmote={sendEmote} setOpen={setOpen} />    
                </ View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    emoteButtonContainer:{
        position: 'relative'
    },
    emoteMenuPosition: {
        position: 'absolute',
        bottom: 60,
        right: 0
    }
});


export default EmoteButton;