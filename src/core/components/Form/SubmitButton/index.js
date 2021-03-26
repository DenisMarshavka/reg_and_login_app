import React from "react";
import {TouchableOpacity, Text, ViewPropTypes} from 'react-native';
import PropType from "prop-types";

import styles from './styles'
import withSystemTheme from "../../../../utils/HoC/withSystemTheme";
import {COLORS} from "../../../constants";

const SubmitButton = ({
    isDarkTheme,

    style,
    textStyle,
    onPress,
    activeOpacity,
    title,
}) => (
    <TouchableOpacity
        activeOpacity={activeOpacity}
        style={[
            styles.element,
            style,
            {
                backgroundColor: COLORS[isDarkTheme ? 'light' : 'dark']
            }
        ]}
        onPress={onPress}
    >
        <Text
            style={[
                styles.text,
                textStyle,
                { color: COLORS[isDarkTheme ? 'dark' : 'light'] }
            ]}
        >{title}</Text>
    </TouchableOpacity>
);

SubmitButton.propTypes = {
    isDarkTheme: PropType.bool,

    title: PropType.string,
    style: ViewPropTypes.style,
    textStyle: ViewPropTypes.style,
    onPress: PropType.func,
    activeOpacity: PropType.number,
};

SubmitButton.defaultProps = {
    isDarkTheme: false,

    style: {},
    title: 'Log In',
    textStyle: {},
    onPress: () => null,
    activeOpacity: .5,
};

export default React.memo(withSystemTheme(SubmitButton));
