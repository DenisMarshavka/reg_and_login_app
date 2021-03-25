import React from 'react';
import {View, Text} from 'react-native';
import PropType from 'prop-types';

import styles from './styles';
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import {Container} from "../../components";
import {COLORS} from "../../constants";
import Header from "../../components/Header";

const RegistrationScreen = ({ isDarkTheme, colorText, navigation }) => (
    <>
        <Header navigation={navigation} title="Registration" />

        <Container style={styles.container}>
            <Text
                style={{
                    color: COLORS[colorText],
                    textAlign: 'center',
                    width: '100%',
                }}
            >RegistrationScreen screen</Text>
        </Container>
    </>
);

RegistrationScreen.propTypes = {
    isDarkTheme: PropType.bool,
    colorText: PropType.oneOf(['light', 'dark']),
    navigation: PropType.shape().isRequired,
};

RegistrationScreen.defaultProps = {
    isDarkTheme: false,
    colorText: 'light',
    navigation: {},
};

export default React.memo(withSystemTheme(RegistrationScreen));
