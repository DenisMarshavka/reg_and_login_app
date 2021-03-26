import React from 'react';
import {View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import {COLORS} from "../../constants";

const Container = ({ children, isDarkTheme, style, ...restProps }) => (
    <View
        style={
            [
                styles.container,
                style,
                isDarkTheme && {
                    backgroundColor: COLORS.dark
                },
            ]
        }
        {...restProps}
    >
        { children }
    </View>
);

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.arrayOf(PropTypes.shape({})),
        PropTypes.bool,
    ]),
    isDarkTheme: PropTypes.bool,
    style: ViewPropTypes.style,
};

Container.defaultProps = {
    isDarkTheme: false,
    style: {},
};

export default React.memo(withSystemTheme(Container));
