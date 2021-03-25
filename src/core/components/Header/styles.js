import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from "../../constants";

export default StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingBottom: 15,
        paddingHorizontal: SIZES.paddingHorizontal,
        width: '100%',
        backgroundColor: COLORS.light,

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.dark,
    },
    safeAreaView: {
        backgroundColor: COLORS.light,
    },

    backBtn: {
        paddingRight: 10,
        alignItems: 'center',
        zIndex: 2,
    },
    backBtnIcon: {
        paddingRight: 5,
    },
    title: {
        fontSize: 19,
        width: '100%',
        textAlign: 'center',
    },
});
