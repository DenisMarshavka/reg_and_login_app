import {StyleSheet} from 'react-native';
import {COLORS} from "../../constants";

export default StyleSheet.create({
    scrollContentContainer: {
        backgroundColor: COLORS.light,
    },
    container: {
        maxHeight: 450,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 35,
    },
    regButton: {
        marginTop: 20,
    },
});
