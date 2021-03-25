import React from 'react';
import {ActivityIndicator, LogBox} from 'react-native';
import PropType from 'prop-types';

import styles from './styles';
import {Container} from "../../components";
import {COLORS, SCENE_KEYS} from "../../constants";
import withSystemTheme from "../../../utils/HoC/withSystemTheme";

LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered',
    'RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks',
]);

const SplashScreen = ({ navigation, isDarkTheme, colorText }) => {
    const loadingTime = React.useRef(0);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadingTime.current = setTimeout(() => {
            setLoading(true);
        }, 1500);

        return () => {
            clearTimeout(loadingTime.current);
        };
    }, []);

    React.useEffect(() => {
        navigation && navigation.navigate
        && navigation.navigate(SCENE_KEYS.Login);
    }, [navigation]);

    return (
        <Container style={styles.container}>
            {
                loading && (
                    <ActivityIndicator color={COLORS[colorText]} />
                )
            }
        </Container>
    )
};

SplashScreen.propTypes = {
    navigation: PropType.shape(),
    isDarkTheme: PropType.bool,
    colorText: PropType.oneOf(['light', 'dark']),
};

SplashScreen.defaultProps = {
    isDarkTheme: false,
    navigation: {},
    colorText: 'light',
};

export default React.memo(withSystemTheme(SplashScreen));
