import React from "react";
import {useColorScheme, StatusBar, View} from 'react-native';

import {COLORS} from "../../core/constants";

const withSystemTheme = (OldComponent = View) => ({ withStatusBar = true, ...resProps }) => {
    const isDark = useColorScheme() === 'dark';

    return (
        <>
            {
                withStatusBar && (
                    <StatusBar
                        backgroundColor={COLORS[isDark ? 'dark' : 'light']}
                        barStyle={`${isDark ? 'light' : 'dark'}-content`}
                    />
                )
            }

            <OldComponent
                isDarkTheme={isDark} {...resProps}
                colorText={isDark ? 'light' : 'dark'}
            />
        </>
    );
};

export default withSystemTheme;
