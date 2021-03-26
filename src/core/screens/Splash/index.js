import React from 'react';
import {ActivityIndicator, LogBox} from 'react-native';
import PropType from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

import styles from './styles';
import {Container} from "../../components";
import {COLORS, SCENE_KEYS} from "../../constants";
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import {setSplashStatusAction} from "../../../store/app/app.actions";

LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered',
    'RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks',
]);

const SplashScreen = ({ navigation, colorText }) => {
    const loadingTime = React.useRef(0);

    const { loading = true, userAuthorized = false } = useSelector(({ app = {}, user = {} }) => ({
        loading: app.splashLoading,
        userAuthorized: user.isAuthorized,
    }));
    const dispatch = useDispatch();

    React.useEffect(() => {
        loadingTime.current = setTimeout(() => {
            dispatch(setSplashStatusAction(false));
        }, 1500);

        return () => {
            clearTimeout(loadingTime.current);
        };
    }, [dispatch]);

    React.useEffect(() => {
        if (navigation && navigation.navigate) {
            navigation.navigate(
                SCENE_KEYS[
                    !loading && userAuthorized
                        ? 'Authorized'
                        : 'Login'
                    ]
            );
        }
    }, [userAuthorized, loading, navigation]);

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
    navigation: PropType.shape({}),
    colorText: PropType.oneOf(['light', 'dark']),
};

SplashScreen.defaultProps = {
    navigation: {},
    colorText: 'light',
};

SplashScreen.navigationOptions = () => ({
    headerShown: false,
    swipeEnabled: false,
});

export default React.memo(withSystemTheme(SplashScreen));
