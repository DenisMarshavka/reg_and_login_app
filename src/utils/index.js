import {Animated} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as jwt from 'jwt-simple';
import {ASYNC_STORAGE_KEYS, secretJWKKey} from "../core/constants";

export const checkObjectValid = (object = {}, existingParams = [], checkToAllFill = false) => {
    let isValid = object && typeof object === 'object'
        && Object.keys(object) && Object.keys(object).length;

    if (existingParams && Array.isArray(existingParams) && existingParams.length) {
        for (let key of existingParams) {
            if (isValid) {
                if (!checkToAllFill) {
                    isValid = key && !!(object[key])
                } else {
                    isValid = key && object[key]
                        && (
                            (typeof object[key] === 'string' && object[key] && object[key].trim())
                            || (typeof object[key] === 'number' && !Number.isNaN(+object[key]))
                            || (Array.isArray(object[key]) && object[key].length && object[key])
                            || (
                                typeof object[key] === 'object' && Object.keys(object[key])
                                && Object.keys(object[key]).length && object[key]
                            ) || (typeof object[key] === 'boolean')
                        )
                }
            } else break;
        }
    }

    return isValid;
}

export const asyncStorageKeyEvents = async (
    method = 'get',
    key = '',
    params = {},
    callback = () => null,
) => {
    let data = {};

    try {
        if (
            key && typeof key === 'string' && key.trim()
            && method && typeof method === 'string'
            && method.trim()
        ) {
            if (method === 'get') {
                const value = await AsyncStorage.getItem(key);

                data.result = (value && JSON.parse(value)) || null;
            } else if (
                method === 'set' && params
                && (
                    (
                        typeof params === 'object'
                        && Object.keys(params) && Object.keys(params).length
                    ) || Array.isArray(params) && params.length
                )
            ) {
                await AsyncStorage.setItem(key, JSON.stringify(params));
            } else if (AsyncStorage[`${method}`]) {
                await AsyncStorage[`${method}`](key, params);
            } else console.log('@@@asyncStorageKeyEvents@method Error params:', { method });
        } else console.log('@@@asyncStorageKeyEvents Error params:', { method, key, params, callback });

        if (callback && typeof callback === 'function') callback(data);
        return data;
    } catch (e) {
        console.log('@@@asyncStorageKeyEvents:', e);
    }
}

export const goAnimateEffect = (
    focusEffect = null,
    toValue = 1,
    duration = 100,
    useNativeDriver = false,
    thenCallBack = () => null
) => {
    if (!focusEffect) return null;

    Animated.timing(focusEffect, {
        toValue,
        duration,
        useNativeDriver,
    }).start();

    setTimeout(thenCallBack, duration);
};

export const checkUserExist = async (values = {}, withPassCheck = false) => {
    let userIndex = -1;
    let usersList = [];

    try {
        if (checkObjectValid(values, ['email', 'password'], true)) {
            usersList = await asyncStorageKeyEvents('get', ASYNC_STORAGE_KEYS.usersRegList);

            usersList = usersList && usersList.result && Array.isArray(usersList.result)
                ? usersList.result
                : [];

            userIndex = usersList.findIndex((user) => (
                user && checkObjectValid(user, ['email'])
                && user.email.trim() && values
                && checkObjectValid(values, ['email'])
                && values.email === user.email && (
                    !withPassCheck
                    || (
                        withPassCheck
                        && values.password === user.password
                    )
                )
            ));

            return {
                userIndex,
                usersList,
            };
        } else {
            console.log('@@@checkUserExist Error params:', { values });
            return {};
        }
    } catch (e) {
        console.log('@@@checkUserExist', e);

        return {};
    }
};

export const JWT = (values = {}, token = '') => {
    try {
        let result = null;

        return {
            encode: () => {
                if (values && checkObjectValid(values)) {
                    result = jwt.encode(values, secretJWKKey);
                } else console.log('@@@JWT@encode Error params: ', {values});

                return result;
            },
            decode: () => {
                if (token && typeof token === 'string' && token.trim()) {
                    result = jwt.decode(token, secretJWKKey);
                } else console.log('@@@JWT@decode Error params: ', {token});

                return result;
            },
        };
    } catch (e) {
        console.log('@@@JWT', e);
    }
};
