import React from "react";
import {ViewPropTypes, Keyboard} from 'react-native';
import PropsType from 'prop-types';

import styles from './styles'
import {checkObjectValid} from "../../../../utils";
import Input from "../../../components/Form/Input";
import SubmitButton from "../../../components/Form/SubmitButton";
import {Container} from "../../../components";

const FormWithValidation = ({
    children,
    inputs,
    uniqInputsProps,
    onSubmit,
    submitTitle,
    errors,
    handleChange,
    values,
    touched,
    isValid,
    handleBlur,

    wrapperStyle,
    submitStyle,
    inputStyle,
}) => {
    const renderFields = React.useCallback(() => {
        if (checkObjectValid(inputs)) {
            return Object.keys(inputs).map((inputName = '', index = 0) => (
                <Input
                    key={`input-${inputName}-${index}`}
                    error={touched[inputName] && errors[inputName]}
                    style={[
                        inputStyle,
                        errors[inputName] && touched[inputName] && {
                            borderColor: 'red'
                        },
                        index === 0 && {
                            marginTop: 0,
                        },
                    ]}
                    value={values[inputName]}
                    onChangeText={handleChange(inputName)}
                    onBlur={(props) => handleBlur(inputName)(props)}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    {...(uniqInputsProps[inputName] || {})}
                />
            ));
        }
    }, [
        values, errors,
        uniqInputsProps, inputs,
        handleChange, touched,
    ]);

    const inputsValid = React.useMemo(() => {
        let allInputsTouched = false;

        if (checkObjectValid(touched)) {
            for (let input of Object.keys(touched)) {
                if (allInputsTouched) allInputsTouched = touched[input];
            }
        }

        return !!(
            isValid && checkObjectValid(values)
            && !Object.keys(errors).length
            && allInputsTouched
        );
    }, [isValid, touched, values, errors]);

    return (
        <Container style={[styles.container, wrapperStyle]}>
            {renderFields()}

            {children}

            <SubmitButton
                enable={inputsValid}
                style={[styles.submitBtn, submitStyle]}
                onPress={onSubmit}
                title={submitTitle}
                activeOpacity={.5}
            />
        </Container>
    );
}

FormWithValidation.propTypes = {
    children: PropsType.shape({}),
    inputs: PropsType.shape({}).isRequired,
    uniqInputsProps: PropsType.shape({}),
    onSubmit: PropsType.func.isRequired,
    submitTitle: PropsType.string,
    errors: PropsType.shape({}),
    handleChange: PropsType.func,
    values: PropsType.shape({}),
    touched: PropsType.shape({}),
    isValid: PropsType.bool,
    handleBlur: PropsType.func,

    wrapperStyle: ViewPropTypes.style,
    submitStyle: ViewPropTypes.style,
    inputStyle: ViewPropTypes.style,
};

FormWithValidation.defaultProps = {
    children: null,
    uniqInputsProps: {},
    submitTitle: 'Log In',
    errors: {},
    handleChange: () => null,
    values: {},
    touched: {},
    isValid: false,
    handleBlur: () => null,

    wrapperStyle: {},
    submitStyle: {},
    inputStyle: {},
};

export default React.memo(FormWithValidation);
