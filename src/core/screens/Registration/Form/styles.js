import {StyleSheet} from 'react-native';
import {SIZES} from "../../../constants";

export default StyleSheet.create({
    container: {
        paddingTop: 65,
        paddingHorizontal: SIZES.paddingHorizontal,

        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    submitBtn: {
        marginTop: 20,
    },
});
