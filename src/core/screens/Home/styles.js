import {StyleSheet} from 'react-native';
import {SIZES} from "../../constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.paddingHorizontal,
        paddingBottom: 30,
        alignItems: 'flex-start',
    },
    logOutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    logOutButtonIcon: {
        marginRight: 10,
    },
    logOutButtonText: {
        fontWeight: 'bold',
    },
});

