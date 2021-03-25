import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import withSystemTheme from "../../../utils/HoC/withSystemTheme";

const HomeScreen = () => (
    <View style={styles.container}>
        <Text>Home screen</Text>
    </View>
);

export default React.memo(withSystemTheme(HomeScreen));
