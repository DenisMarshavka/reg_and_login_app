import React from "react";
import {TextInput, ViewPropTypes} from 'react-native';
import PropType from "prop-types";

import styles from './styles'
import withSystemTheme from "../../../../utils/HoC/withSystemTheme";
import {COLORS} from "../../../constants";
import Error from "../Error";

const Input = ({
    isDarkTheme,
    colorText,

    style,
    placeholderTextColor,
    autoCompleteType,
    placeholder,
    onChangeText,
    value,
    error,
    ...restPops
}) => (
    <>
        <TextInput
            style={[
                styles.element,
                {
                    backgroundColor: COLORS[!isDarkTheme ? 'light' : 'dark'],
                    borderColor: COLORS[isDarkTheme ? 'light' : 'dark'],
                },
                isDarkTheme && {
                    color: COLORS.light,
                },
                style,
            ]}
            autoCompleteType={autoCompleteType}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            { ...restPops }
        />

        {
            error ? (
                <Error
                    errorText={error}
                />
            ) : null
        }
    </>
);

Input.propTypes = {
    isDarkTheme: PropType.bool,
    colorText: PropType.oneOf(['light', 'dark']),

    style: ViewPropTypes.style,
    placeholderTextColor: PropType.string,
    autoCompleteType: PropType.string,
    placeholder: PropType.string,
    onChangeText: PropType.func.isRequired,
    value: PropType.string.isRequired,
    error: PropType.oneOfType([PropType.string, PropType.bool]),
};

Input.defaultProps = {
    isDarkTheme: false,
    colorText: 'light',

    style: {},
    placeholderTextColor: COLORS.gray,
    autoCompleteType: 'email',
    placeholder: 'Email',
    error: '',
};

export default React.memo(withSystemTheme(Input));
