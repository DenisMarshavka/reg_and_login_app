import React from 'react';
import {View, Text} from 'react-native';
import PropType from 'prop-types';
import {useDispatch} from "react-redux";

import styles from './styles';
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import {TouchableOpacity} from "react-native-gesture-handler";
import {COLORS, SCENE_KEYS} from "../../constants";
import Container from "../../components/Container";
import Header from "../../components/Header";
import {setUserAuthorizationStatusAction} from "../../../store/user/user.actions";
import UsersList from "./UsersList";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faDoorOpen} from "@fortawesome/free-solid-svg-icons";

const HomeScreen = ({ navigation, colorText }) => {
    const dispatch = useDispatch();

    return (
        <>
            <Header title="Home" withBackHandler={false} />

            <Container style={styles.container}>
                <UsersList />

                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={() => {
                        dispatch(setUserAuthorizationStatusAction(false));
                        navigation && navigation.navigate && navigation.navigate(SCENE_KEYS.Unauthorized);
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
    navigation: PropType.shape({}).isRequired,
    colorText: PropType.oneOf(['light', 'dark']),
};

HomeScreen.defaultProps = {
    colorText: 'light',
};

export default React.memo(withSystemTheme(HomeScreen));
