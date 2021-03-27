import {StyleSheet} from 'react-native';
import {COLORS} from "../../constants";

export default StyleSheet.create({
    scrollContentContainer: {
        backgroundColor: COLORS.light,
    },
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    regButton: {
        marginTop: 20,
        paddingBottom: 35,
    },
});
