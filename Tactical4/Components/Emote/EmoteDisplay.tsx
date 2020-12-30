import React, { ForwardedRef, forwardRef, RefAttributes, RefObject, useImperativeHandle } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { EMOTES } from './EmoteMenu';

export interface EmoteDisplayRef {
    showEmote: (emoteID: number) => void
}

const EmoteDisplay = forwardRef((props: any, ref: ForwardedRef<EmoteDisplayRef>) => {

    const [view, setView] = React.useState<JSX.Element | null>(null);
    const [emote, setEmote] = React.useState<any>(null);
    const [rotate] = React.useState( new Animated.Value(0.7) )
    const [scale] = React.useState( new Animated.Value(0.9) )
    
    useImperativeHandle(ref, () => ({
        showEmote(emoteID: number) {
            if(EMOTES.length > emoteID) {
                setEmote(EMOTES[emoteID])
            }
        }
    }));


    React.useEffect(() => {
        if(!emote) {
            Animated.timing(scale, {
                toValue: 0,
                delay: 0,
                duration: 700,
                useNativeDriver: false
            }).start(removeView);
        } else {
            insertView();
            Animated.timing(scale, {
                toValue: 1,
                delay: 0,
                duration: 500,
                useNativeDriver: false
            }).start();

            Animated.loop(
                Animated.sequence([
                    Animated.timing(rotate, {
                        toValue: 0.8,
                        duration: 500,
                        useNativeDriver: false
                    }),
                    Animated.delay(150),
                    Animated.timing(rotate, {
                        toValue: 0.7,
                        duration: 500,
                        useNativeDriver: false
                    }),
                    Animated.delay(150)
                ]),
                {
                    iterations: 3
                }
            ).start()

            const hideEmote = setTimeout(() => {
                setEmote(null)
            }, 3500);

            return () => clearTimeout(hideEmote)
        }

    }, [emote])

    const insertView = () => setView(
        <Image style={styles.emote} source={emote} />
    );

    const removeView = () => setView(null);

    const spin = React.useMemo(() => (
        rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
    ), [rotate])

    return (
        <View style={[styles.emote, { marginHorizontal: 15, transform: [ {rotate: '90deg'}, {translateX : 10} ] }]}>
            <Animated.View
                pointerEvents={scale ? 'auto' : 'none'}
                style={{ transform: [ { scale: scale }, {rotate: spin}, {translateX : -8}, {translateY : -12} ] }}
            >
                {view}
            </Animated.View>
        </View>
    );
})

const styles = StyleSheet.create({
    emote: {
        height: 32,
        width: 32,
        marginHorizontal: 6
    }
});

export default EmoteDisplay;