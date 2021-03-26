import {Dimensions} from 'react-native';

export const SCENE_KEYS = {
    Unauthorized: 'Unauthorized',
    Authorized: 'Authorized',

    Splash: 'Splash',
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

export const SIZES = {
    paddingHorizontal: 25,
    widthDevice: Dimensions.get('screen').width,
    heightDevice: Dimensions.get('screen').height,
}
