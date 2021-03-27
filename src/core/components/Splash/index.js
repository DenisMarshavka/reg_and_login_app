import React from 'react';
import {ActivityIndicator, Animated, Text} from 'react-native';
import PropType from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

import styles from './styles';
import {Container} from "../index";
import {ASYNC_STORAGE_KEYS, COLORS, IOS, SCENE_KEYS, SIZES} from "../../constants";
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import {setSplashStatusAction} from "../../../store/app/app.actions";
import {asyncStorageKeyEvents, checkUserExist, goAnimateEffect, JWT} from "../../../utils";
import {setUserAuthorizationStatusAction} from "../../../store/user/user.actions";

const Splash = ({ navigate, colorText }) => {
    const loadingTime = React.useRef(0);
    const animateTime = React.useRef(0);
    const [translateY] = React.useState(new Animated.Value(0));

    const { loading = true, userAuthorized = false } = useSelector(({ app = {}, user = {} }) => ({
        loading: app.splashLoading,
        userAuthorized: user.isAuthorized,
    }));
    const dispatch = useDispatch();

    React.useEffect(() => () => {
        dispatch(setSplashStatusAction(true));
    }, [dispatch]);

    React.useEffect(() => {
        if (!loading) {
            animateTime.current = setTimeout(() => {
                goAnimateEffect(translateY, -SIZES.heightDevice, 1000, IOS);
            }, 500);
        }

        return () => {
            clearTimeout(animateTime.current);
        }
    }, [loading, animateTime]);

    React.useEffect(() => {
        try {
            (async () => {
                let userToken = '';
                const oldJWT = await asyncStorageKeyEvents(
                    'get',
                    ASYNC_STORAGE_KEYS.userToken,
                );
                userToken = oldJWT && oldJWT.result && oldJWT.result
                    && oldJWT.result.token && oldJWT.result.token.trim();

                const userCredits = userToken && JWT({}, userToken).decode();
                const {userIndex = -1} = await checkUserExist(userCredits, true);

                if (userIndex > -1 && userToken && userToken.trim()) {
                    dispatch(setUserAuthorizationStatusAction(true, userToken, userCredits.email));
                } else dispatch(setUserAuthorizationStatusAction(false));

                loadingTime.current = setTimeout(() => {
                    dispatch(setSplashStatusAction(false));
                }, 500);
            })();
        } catch (e) {
            console.log('@@@splash@autoLogin', e);

            loadingTime.current = setTimeout(() => {
                dispatch(setSplashStatusAction(false));
            }, 500);
        }

        return () => {
            clearTimeout(loadingTime.current);
        };
    }, [dispatch, loadingTime]);

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
