import {StyleSheet} from 'react-native';
import {COLORS} from "../../constants";

export default StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 25,
        color: COLORS.dark,
        fontSize: 19,
    },
});
