import {StyleSheet} from 'react-native';
import {SIZES} from "../../../constants";

export default StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 65,
        paddingHorizontal: SIZES.paddingHorizontal,

        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    submitBtn: {
        marginTop: 20,
    },
});
