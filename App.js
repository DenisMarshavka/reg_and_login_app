/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createAppContainer} from'react-navigation';

import AppNavigator from "./src/core";
import navigationUtils from "./src/core/navigationUtils";

const AppNavigation = createAppContainer(AppNavigator);

const App = () => {
    let navigatorRef = React.useRef();

    return (
        <AppNavigation
            ref={(ref) => {
              navigatorRef = ref;
              navigationUtils.setTopLevelNavigator(ref);
            }}
        />
    );
};

export default App;
