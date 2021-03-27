import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropType from 'prop-types';

import styles from './styles';
import {COLORS, SCENE_KEYS, SIZES} from "../../constants";
import {Container} from "../../components";
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import Header from "../../components/Header";
import LogForm from "./Form";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation, colorText, isDarkTheme }) => {
    const [headerHeight, setHeaderHeight] = React.useState(0);

    const handleHeaderLayout = React.useCallback(({ nativeEvent: { layout } }) => {
        const currHeaderHeight = layout && layout.height ? layout.height : 0;

        if (currHeaderHeight && currHeaderHeight !== headerHeight) {
            setHeaderHeight(currHeaderHeight);
        }
    }, [headerHeight]);

    return (
        <KeyboardAwareScrollView
            bounces={false}
            enableOnAndroid
            contentContainerStyle={
                [
                    styles.scrollContentContainer,
                    isDarkTheme && {
                        backgroundColor: COLORS.dark,
                    },
                    {
                        minHeight: SIZES.heightDevice - headerHeight,
                    },
                ]
            }
            showsVerticalScrollIndicator={false}
        >
            <Header onLayout={handleHeaderLayout} title="Login" withBackHandler={false} />

            <Container style={styles.container}>
                <LogForm />

                <TouchableOpacity style={styles.regButton} onPress={() => navigation?.navigate(SCENE_KEYS.Registration)}>
                    <Text style={{ color: COLORS[colorText] }}>Регистрация</Text>
                </TouchableOpacity>
            </Container>
        </KeyboardAwareScrollView>
    );
}

LoginScreen.propTypes = {
    navigation: PropType.shape({}).isRequired,
    isDarkTheme: PropType.bool,
    colorText: PropType.oneOf(['light', 'dark']),
};

LoginScreen.defaultProps = {
    isDarkTheme: false,
    colorText: 'light',
};

export default React.memo(withSystemTheme(LoginScreen));
