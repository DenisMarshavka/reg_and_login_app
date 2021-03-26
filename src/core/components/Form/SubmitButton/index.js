import React from "react";
import {TouchableOpacity, Text, ViewPropTypes, View} from 'react-native';
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
    enable,
    title,
}) => (
    <View
        style={[
            styles.element,
            style,
            {
                backgroundColor: COLORS[isDarkTheme ? 'light' : 'dark']
            },
            !enable && {opacity: .5},
        ]}
    >
        <TouchableOpacity
            activeOpacity={!enable ? 1 : activeOpacity}
            style={styles.elementTouchable}
            onPress={enable ? onPress : null}
        >
            <Text
                style={[
                    styles.text,
                    textStyle,
                    { color: COLORS[isDarkTheme ? 'dark' : 'light'] }
                ]}
            >{title}</Text>
        </TouchableOpacity>
    </View>
);

SubmitButton.propTypes = {
    isDarkTheme: PropType.bool,
    enable: PropType.bool,

    title: PropType.string,
    style: ViewPropTypes.style,
    textStyle: ViewPropTypes.style,
    onPress: PropType.func,
    activeOpacity: PropType.number,
};

SubmitButton.defaultProps = {
    isDarkTheme: false,
    enable: true,

    style: {},
    title: 'Log In',
    textStyle: {},
    onPress: () => null,
    activeOpacity: .5,
};

export default React.memo(withSystemTheme(SubmitButton));
