import React from 'react';
import PropType from 'prop-types';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import styles from './styles';
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import Header from "../../components/Header";
import RegForm from "./Form";


const RegistrationScreen = ({ navigation }) => (
    <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
    >
        <Header navigation={navigation} title="Registration" />

        <RegForm />
    </KeyboardAwareScrollView>
);

RegistrationScreen.propTypes = {
    navigation: PropType.shape({}).isRequired,
};

RegistrationScreen.defaultProps = {
    navigation: {},
};

export default React.memo(withSystemTheme(RegistrationScreen));
