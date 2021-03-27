import React from "react";
import {ViewPropTypes} from 'react-native';
import * as Yup from "yup";
import {useFormik} from "formik";

import styles from './styles';
import FormWithValidation from "../../../components/Form/FormWithValidation";
import {asyncStorageKeyEvents, checkObjectValid, checkUserExist, JWT} from "../../../../utils";
import {ASYNC_STORAGE_KEYS} from "../../../constants";
import Error from "../../../components/Form/Error";
import {setUserAuthorizationStatusAction} from "../../../../store/user/user.actions";
import {useDispatch} from "react-redux";

const logSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string()
        .min(5, 'Password should exist 5 symbols minimum')
        .max(25, 'Password should exist 25 symbols maximum')
        .required('Password is required'),
});

const LogForm = ({ inputStyle }) => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = React.useState('');

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
        handleBlur, setFieldError,
    } = useFormik({
        validationSchema: logSchema,
        initialValues: inputs,
        onSubmit: values => onSubmit(values),
    });

    const onSubmit = React.useCallback(async (values = {}) => {
        if (checkObjectValid(values, ['email', 'password'])) {
            const { userIndex = -1 } = await checkUserExist(values, true);
            const newJWT = JWT(values).encode();

            if (userIndex === -1) {
                setFieldError('email', 'Email or Password is not valid, please try again');
            } else await asyncStorageKeyEvents(
                'set',
                ASYNC_STORAGE_KEYS.userToken,
                { token: newJWT },
                () => {
                    resetForm();
                    dispatch(setUserAuthorizationStatusAction(true, newJWT, values.email))
                },
            );
        } else {
            setErrorMessage('Something went wrong, please try again later');
            console.log('@@@Auth@onSubmit Error params:', { values });
        }
    }, [setErrorMessage, setFieldError, resetForm]);

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
            setInitialError={setErrorMessage}
            isValid={isValid && !errorMessage}
            handleBlur={handleBlur}
        >
            {
                errorMessage && errorMessage.trim() ? (
                    <Error errorText={errorMessage} style={styles.bottomError}/>
                ) : null
            }
        </FormWithValidation>
    );
}

LogForm.propTypes = {
    inputStyle: ViewPropTypes.style,
};

LogForm.defaultProps = {
    inputStyle: {},
};

export default React.memo(LogForm);
