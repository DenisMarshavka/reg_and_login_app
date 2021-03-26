import React from "react";
import {TextInput, ViewPropTypes} from 'react-native';
import PropType from "prop-types";

import styles from './styles'

const Error = ({
    style,
    errorText,
}) => {
    if (typeof errorText !== 'string' || !errorText.trim()) return null;

    return (
        <TextInput style={[styles.element, style]}>
            {`* ${errorText}`}
        </TextInput>
    );
}

Error.propTypes = {
    style: ViewPropTypes.style,
    errorText: PropType.string,
};

Error.defaultProps = {
    style: {},
    errorText: '',
};

export default React.memo(Error);
