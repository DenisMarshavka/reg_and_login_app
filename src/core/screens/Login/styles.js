import {StyleSheet} from 'react-native';
import {SIZES} from "../../constants";

export default StyleSheet.create({
    scrollContentContainer: {
        minHeight: SIZES.heightDevice,
    },
    container: {
        flex: 1,
        paddingTop: 65,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: SIZES.paddingHorizontal,
        paddingBottom: 35,
    },
    regButton: {
        marginTop: 25,
    },
});
