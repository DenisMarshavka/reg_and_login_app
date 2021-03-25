/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createAppContainer} from'react-navigation';
import { Provider } from 'react-redux';

import AppNavigator from "./src/core";
import navigationUtils from "./src/core/navigationUtils";
import {store} from "./src/store";

const AppNavigation = createAppContainer(AppNavigator);

const App = () => {
    let navigatorRef = React.useRef();

    return (
        <Provider store={store}>
            <AppNavigation
                ref={(ref) => {
                  navigatorRef = ref;
                  navigationUtils.setTopLevelNavigator(ref);
                }}
            />
        </Provider>
    );
};

export default App;
