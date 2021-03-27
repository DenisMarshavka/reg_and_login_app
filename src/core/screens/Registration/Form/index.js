import React from "react";
import {ViewPropTypes} from 'react-native';
import * as Yup from "yup";
import {useFormik} from "formik";

import {checkObjectValid} from "../../../../utils";
import FormWithValidation from "../../../components/Form/FormWithValidation";

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
        setFieldError, handleBlur,
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

    const onSubmit = React.useCallback((values = {}) => {
        console.log({
            values,
        });
    }, []);

    return (
        <FormWithValidation
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

RegForm.propTypes = {
    inputStyle: ViewPropTypes.style,
};

RegForm.defaultProps = {
    inputStyle: {},
};

export default React.memo(RegForm);
