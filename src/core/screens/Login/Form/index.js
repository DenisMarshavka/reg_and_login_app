import React from "react";
import {ViewPropTypes, Keyboard} from 'react-native';
import * as Yup from "yup";
import {useFormik} from "formik";

import styles from './styles'
import {checkObjectValid} from "../../../../utils";
import Input from "../../../components/Form/Input";
import SubmitButton from "../../../components/Form/SubmitButton";

const logSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string()
        .min(5, 'Password should exist 5 symbols minimum')
        .max(25, 'Password should exist 25 symbols maximum')
        .required('Password is required'),
});

const LogForm = ({ inputStyle }) => {
    const inputs = React.useMemo(() => ({
        email: '',
        password: '',
    }), []);

    const uniqInputsProps = React.useMemo(() => (
        {
            email: {
                autoCompleteType: 'email',
                placeholder: 'Email',
                autoCapitalize: 'none',
                autoCorrect: false,
            },
            password: {
                textContentType: 'none',
                autoCompleteType: 'password',
                placeholder: 'Password',
                autoCapitalize: 'none',
                secureTextEntry: true,
                blurOnSubmit: false,
            },
        }
    ), []);

    const {
        errors, handleChange, resetForm,
        handleSubmit, values, touched, isValid,
        handleBlur,
    } = useFormik({
        validationSchema: logSchema,
        initialValues: inputs,
        onSubmit: values => onSubmit(values),
    });

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

    const onSubmit = React.useCallback((values = {}) => {
        console.log({
            values,
        });
    }, []);

    const inputsValid = React.useMemo(() => !!(
        isValid && checkObjectValid(values)
        && checkObjectValid(touched)
        && !Object.keys(errors).length
        && touched.password
        && touched.email
        && values.password
        && values.email
    ), [isValid, touched, values, errors]);

    return (
        <>
            {renderFields()}

            <SubmitButton
                enable={inputsValid}
                style={styles.submitBtn}
                onPress={handleSubmit}
                title="Sign In"
                activeOpacity={.5}
            />
        </>
    );
}

LogForm.propTypes = {
    inputStyle: ViewPropTypes.style,
};

LogForm.defaultProps = {
    inputStyle: {},
};

export default React.memo(LogForm);
