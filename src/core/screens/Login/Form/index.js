import React from "react";
import {ViewPropTypes} from 'react-native';
import * as Yup from "yup";
import {useFormik} from "formik";

import styles from './styles';
import FormWithValidation from "../../../components/Form/FormWithValidation";

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

    const onSubmit = React.useCallback((values = {}) => {
        console.log({
            values,
        });
    }, []);

    return (
        <FormWithValidation
            wrapperStyle={styles.container}
            inputs={inputs}
            uniqInputsProps={uniqInputsProps}
            onSubmit={handleSubmit}
            submitTitle="Sign Up"
            errors={errors}
            handleChange={handleChange}
            values={values}
            touched={touched}
            isValid={isValid}
            handleBlur={handleBlur}
        />
    );
}

LogForm.propTypes = {
    inputStyle: ViewPropTypes.style,
};

LogForm.defaultProps = {
    inputStyle: {},
};

export default React.memo(LogForm);
