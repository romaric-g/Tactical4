import React from 'react';
import { Animated } from 'react-native';

interface Props {
    isVisible: boolean,
    children: JSX.Element
}

const FadeInOut = ({ isVisible, children }: Props) => {

    const [view, setView] = React.useState<JSX.Element | null>(children);
    const [ opacity, ] = React.useState( new Animated.Value(isVisible ? 1 : 0) )
    //const lastVisibleChange = React.useRef(isVisible);

    React.useEffect(() => {
        //lastVisibleChange.current && 
        if (!isVisible) {
            Animated.timing(opacity, {
                toValue: 0,
                delay: 0,
                duration: 2500,
                useNativeDriver: false
            }).start(removeView);
        }
      
        // if (!lastVisibleChange.current && isVisible) {
        //     insertView();
        //     Animated.timing(opacity, {
        //         toValue: 1,
        //         delay: 0,
        //         duration: 200,
        //         useNativeDriver: false
        //     }).start();
        // }
        // lastVisibleChange.current = isVisible;
    }, [isVisible])

    const insertView = () => setView(children);

    const removeView = () => setView(null);

    return (
        <Animated.View
            pointerEvents={isVisible ? 'auto' : 'none'}
            style={{opacity: opacity}}
        >
            {view}
        </Animated.View>
      );
}

export default FadeInOut;