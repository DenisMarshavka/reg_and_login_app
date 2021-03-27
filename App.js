/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createAppContainer, NavigationActions} from 'react-navigation';
import { Provider } from 'react-redux';
import {LogBox} from "react-native";
import './shim.js';

import AppNavigator from "./src/core";
import navigationUtils from "./src/core/navigationUtils";
import {store} from "./src/store";
import Splash from "./src/core/components/Splash";

LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered',
    'RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks',
]);

const AppNavigation = createAppContainer(AppNavigator);

const App = () => {
    let navigatorRef = React.useRef();

    const navigationNavigate = React.useCallback((routeName = '', params = {}) => {
        if (
            routeName && typeof routeName === 'string'
            && routeName.trim() && navigatorRef
            && navigatorRef.dispatch
        ) {
            navigatorRef.dispatch(
                NavigationActions.navigate({ routeName, params }),
            );
        }
    }, [navigatorRef]);

    return (
        <Provider store={store}>
            <AppNavigation
                ref={(ref) => {
                  navigatorRef = ref;
                  navigationUtils.setTopLevelNavigator(ref);
                }}
            />

            <Splash navigate={navigationNavigate}/>
        </Provider>
    );
};

export default App;
