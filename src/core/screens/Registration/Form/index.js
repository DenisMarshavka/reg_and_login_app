import React from "react";
import {ViewPropTypes, Keyboard} from 'react-native';
import * as Yup from "yup";
import {useFormik} from "formik";

import styles from './styles'
import {checkObjectValid} from "../../../../utils";
import Input from "../../../components/Form/Input";
import SubmitButton from "../../../components/Form/SubmitButton";

const regSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string()
        .min(5, 'Password should exist 5 symbols minimum')
        .max(25, 'Password should exist 25 symbols maximum')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .required('Confirm password is required'),
});

const RegForm = ({ inputStyle }) => {
    const inputs = React.useMemo(() => ({
        email: '',
        password: '',
        confirmPassword: '',
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
            confirmPassword: {
                textContentType: 'none',
                autoCompleteType: 'password',
                autoCapitalize: 'none',
                placeholder: 'Confirm password',
                secureTextEntry: true,
                blurOnSubmit: false,
            },
        }
    ), []);

    const {
        errors, handleChange, resetForm,
        handleSubmit, values, touched, isValid,
        setFieldError,handleBlur,
    } = useFormik({
        validationSchema: regSchema,
        initialValues: inputs,
        onSubmit: values => onSubmit(values),
    });

    React.useEffect(() => {
        if (
            checkObjectValid(values, ['password', 'confirmPassword'], true)
            && checkObjectValid(touched, ['password', 'confirmPassword'])
        ) {
            if (
                touched.password && touched.confirmPassword
                && values.password !== values.confirmPassword
            ) {
                setFieldError(
                    'confirmPassword',
                    'Confirm password is not the same as the Password field',
                );
            }
        }
    }, [values, touched, setFieldError]);

    const renderFields = React.useCallback(() => {
        console.log({
            'checkObjectValid(inputs)': checkObjectValid(inputs),
        });

        if (checkObjectValid(inputs)) {
            return Object.keys(inputs).map((inputName = '', index = 0) => (
                <Input
                    key={`input-${inputName}-${index}`}
                    error={errors[inputName]}
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
                    onSubmitEditing={()=> Keyboard.dismiss()}
                    { ...(uniqInputsProps[inputName] || {}) }
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

    const inputsValid = React.useMemo(() => (
        isValid && checkObjectValid(values)
        && checkObjectValid(touched)
        && !Object.keys(errors).length
        && touched.password && touched.confirmPassword
        && touched.email
        && values.password && values.confirmPassword
        && values.email
    ), [isValid, touched, values, errors]);

    return (
        <>
            { renderFields() }

            <SubmitButton
                style={[styles.submitBtn, !inputsValid && {opacity: .5}]}
                onPress={handleSubmit}
                title="Sign Up"
                activeOpacity={!inputsValid ? 1 : .5}
            />
        </>
    );
}

RegForm.propTypes = {
    inputStyle: ViewPropTypes.style,
};

RegForm.defaultProps = {
    inputStyle: {},
};

export default React.memo(RegForm);
