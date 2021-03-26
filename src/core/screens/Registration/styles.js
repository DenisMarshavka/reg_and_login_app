import {StyleSheet} from 'react-native';
import {SIZES} from "../../constants";

export default StyleSheet.create({
    container: {
        paddingTop: 45,
        paddingHorizontal: SIZES.paddingHorizontal,

        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollContentContainer: {
        minHeight: SIZES.heightDevice,
    },
});
