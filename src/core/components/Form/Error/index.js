import React from "react";
import {Text, ViewPropTypes} from 'react-native';
import PropType from "prop-types";

import styles from './styles'

const Error = ({
    style,
    errorText,
}) => {
    if (typeof errorText !== 'string' || !errorText.trim()) return null;

    return (
        <Text style={[styles.element, style]}>
            {`* ${errorText}`}
        </Text>
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
