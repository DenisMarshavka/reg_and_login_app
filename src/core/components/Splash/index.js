import React from 'react';
import {ActivityIndicator, Animated, Text} from 'react-native';
import PropType from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

import styles from './styles';
import {Container} from "../index";
import {COLORS, IOS, SCENE_KEYS, SIZES} from "../../constants";
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import {setSplashStatusAction} from "../../../store/app/app.actions";
import {goAnimateEffect} from "../../../utils";

const Splash = ({ navigate, colorText }) => {
    const loadingTime = React.useRef(0);
    const animateTime = React.useRef(0);
    const [translateY] = React.useState(new Animated.Value(0));

    const { loading = true, userAuthorized = false } = useSelector(({ app = {}, user = {} }) => ({
        loading: app.splashLoading,
        userAuthorized: user.isAuthorized,
    }));
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!loading) {
            animateTime.current = setTimeout(() => {
                goAnimateEffect(translateY, -SIZES.heightDevice, 1000, IOS);
            }, 2500);
        }

        return () => {
            clearTimeout(animateTime.current);
        }
    }, [loading]);

    React.useEffect(() => {
        loadingTime.current = setTimeout(() => {
            dispatch(setSplashStatusAction(false));
        }, 1500);

        return () => {
            clearTimeout(loadingTime.current);
        };
    }, [dispatch]);

    React.useEffect(() => {
        navigate && navigate(
            SCENE_KEYS[
                !loading && userAuthorized
                    ? 'Authorized'
                    : 'Login'
                ]
        );
    }, [userAuthorized, loading]);

    return (
        <Animated.View
            style={{
                ...styles.wrapper,
                transform: [{
                    translateY,
                }],
            }}
        >
            <Container style={styles.container}>
                <ActivityIndicator color={COLORS[colorText]} />

                <Text style={[styles.text, {color: COLORS[colorText]}]}>
                    Loading...
                </Text>
            </Container>
        </Animated.View>
    )
};

Splash.propTypes = {
    navigate: PropType.func,
    colorText: PropType.oneOf(['light', 'dark']),
};

Splash.defaultProps = {
    navigate: () => null,
    colorText: 'light',
};

export default React.memo(withSystemTheme(Splash));
