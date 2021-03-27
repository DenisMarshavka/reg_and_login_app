import React from 'react';
import {View, ViewPropTypes, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import styles from './styles';
import withSystemTheme from "../../../utils/HoC/withSystemTheme";
import {COLORS} from "../../constants";

const Header = ({ withBackHandler, navigation, title, isDarkTheme, style, colorText, onLayout }) => {
    const titleLeftOffset = React.useMemo(() => {
        let width = 0;

        if (
            title && typeof title === 'string'
            && title.length && withBackHandler
        ) width = -10;

        return width;
    }, [withBackHandler, title]);

    return (
        <SafeAreaView
            onLayout={onLayout}
            style={
                [
                    styles.safeAreaView,
                    isDarkTheme && {
                        backgroundColor: COLORS.dark,
                    }
                ]
            }
        >
            <View
                style={
                    [
                        styles.container,
                        style,
                        isDarkTheme && {
                            backgroundColor: COLORS.dark,
                            borderBottomColor: COLORS.light,
                        }
                    ]
                }
            >
                {
                    withBackHandler && (
                        <TouchableOpacity
                            onPress={
                                () => navigation && navigation.goBack
                                    && navigation.goBack()
                            }
                            style={styles.backBtn}
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                color={COLORS[colorText]}
                                style={styles.backBtnIcon}
                                size={26}
                            />
                        </TouchableOpacity>
                    )
                }

                <Text
                    style={{
                        ...styles.title,
                        color: COLORS[colorText],
                        left: titleLeftOffset,
                    }}
                >
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    );
}

Header.propTypes = {
    isDarkTheme: PropTypes.bool,
    withBackHandler: PropTypes.bool,
    style: ViewPropTypes.style,
    title: PropTypes.string,
    onLayout: PropTypes.func,
    navigation: PropTypes.shape(),
    colorText: PropTypes.oneOf(['light', 'dark']),
};

Header.defaultProps = {
    isDarkTheme: false,
    withBackHandler: true,
    style: {},
    onLayout: () => null,
    title: '',
    navigation: {},
    colorText: 'light',
};

export default React.memo(withSystemTheme(Header));
