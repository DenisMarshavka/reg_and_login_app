import React from 'react';
import {Text} from 'react-native';
import PropType from 'prop-types';
import {useDispatch} from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import {TouchableOpacity} from "react-native-gesture-handler";
import {ASYNC_STORAGE_KEYS, COLORS} from "../../constants";
import Container from "../../components/Container";
import Header from "../../components/Header";
import {setUserAuthorizationStatusAction} from "../../../store/user/user.actions";
import UsersList from "./UsersList";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faDoorOpen} from "@fortawesome/free-solid-svg-icons";

const HomeScreen = ({ colorText }) => {
    const dispatch = useDispatch();

    return (
        <>
            <Header title="Home" withBackHandler={false} />

            <Container style={styles.container}>
                <UsersList />

                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={async () => {
                        dispatch(setUserAuthorizationStatusAction(false));
                        await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.userToken);
                    }}
                >
                    <FontAwesomeIcon
                        icon={faDoorOpen}
                        color={COLORS[colorText]}
                        style={styles.logOutButtonIcon}
                        size={26}
                    />

                    <Text style={[styles.logOutButtonText, {color: COLORS[colorText]}]}>Log Out</Text>
                </TouchableOpacity>
            </Container>
        </>
    );
}

HomeScreen.navigationOptions = () => ({
    swipeEnabled: false,
});

HomeScreen.propTypes = {
    colorText: PropType.oneOf(['light', 'dark']),
};

HomeScreen.defaultProps = {
    colorText: 'light',
};

export default React.memo(withSystemTheme(HomeScreen));
