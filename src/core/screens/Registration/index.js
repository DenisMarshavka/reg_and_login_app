import React from 'react';
import PropType from 'prop-types';

import styles from './styles';
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import {Container} from "../../components";
import Header from "../../components/Header";
import RegForm from "./Form";

const RegistrationScreen = ({ navigation }) => (
    <>
        <Header navigation={navigation} title="Registration" />

        <Container style={styles.container}>
            <RegForm />
        </Container>
    </>
);

RegistrationScreen.propTypes = {
    navigation: PropType.shape({}).isRequired,
};

RegistrationScreen.defaultProps = {
    navigation: {},
};

export default React.memo(withSystemTheme(RegistrationScreen));
