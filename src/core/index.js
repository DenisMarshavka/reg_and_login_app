import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {SCENE_KEYS} from "./constants";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import SplashScreen from "./screens/Splash";
import RegistrationScreen from "./screens/Registration";

const UnauthorizedStack = createStackNavigator({
        [SCENE_KEYS.Splash]: {
            screen: SplashScreen,
        },
        [SCENE_KEYS.Login]: {
            screen: LoginScreen,
        },
        [SCENE_KEYS.Registration]: {
            screen: RegistrationScreen,
        },
    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none',
        defaultNavigationOptions: {
            gestureEnabled: false,
        },
    }
);

const AuthorizedStack = createStackNavigator({
        [SCENE_KEYS.Home]: {
            screen: HomeScreen,
        },
    },
    {
        headerMode: 'none',
    },
);

const AppNavigator = createSwitchNavigator(
    {
        Unauthorized: { screen: UnauthorizedStack },
        Authorized: { screen: AuthorizedStack },
    },
    {
        initialRouteName: 'Unauthorized',
        transitionSpec: {
            duration: 0,
        },
    },
);

export default AppNavigator;
