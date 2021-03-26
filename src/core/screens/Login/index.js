import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropType from 'prop-types';

import styles from './styles';
import {COLORS, SCENE_KEYS} from "../../constants";
import {Container} from "../../components";
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import Header from "../../components/Header";
import LogForm from "./Form";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation, colorText }) => (
    <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
    >
        <Header title="Login" withBackHandler={false} />

        <Container style={styles.container}>
            <LogForm />

            <TouchableOpacity style={styles.regButton} onPress={() => navigation?.navigate(SCENE_KEYS.Registration)}>
                <Text style={{ color: COLORS[colorText] }}>Регистрация</Text>
            </TouchableOpacity>
        </Container>
    </KeyboardAwareScrollView>
);

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
