import {Dimensions, Platform} from 'react-native';

export const IOS = Platform.OS === 'ios';

export const SCENE_KEYS = {
    Unauthorized: 'Unauthorized',
    Authorized: 'Authorized',

    Login: 'Login',
    Registration: 'Registration',
    Home: 'Home',
};

export const COLORS = {
    'dark': '#000',
    'light': '#fff',
    'gray': '#ccc',
    'error': 'red',
};

export const ASYNC_STORAGE_KEYS = {
    'userToken': 'USER_TOKEN',
    'usersRegList': 'USERS_REG_LIST',
};

export const secretJWKKey = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex');

export const SIZES = {
    paddingHorizontal: 25,
    widthDevice: Dimensions.get('screen').width,
    heightDevice: Dimensions.get('screen').height,
}
