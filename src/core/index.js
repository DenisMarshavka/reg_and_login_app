import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {SCENE_KEYS} from "./constants";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import RegistrationScreen from "./screens/Registration";

const UnauthorizedStack = createStackNavigator({
        [SCENE_KEYS.Login]: {
            screen: LoginScreen,
        },
        [SCENE_KEYS.Registration]: {
            screen: RegistrationScreen,
        },
    },
    {
        initialRouteName: SCENE_KEYS.Login,
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
        [SCENE_KEYS.Unauthorized]: { screen: UnauthorizedStack },
        [SCENE_KEYS.Authorized]: { screen: AuthorizedStack },
    },
    {
        initialRouteName: SCENE_KEYS.Unauthorized,
        transitionSpec: {
            duration: 0,
        },
    },
);

export default AppNavigator;
