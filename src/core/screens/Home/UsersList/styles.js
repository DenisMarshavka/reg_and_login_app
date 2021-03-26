import {StyleSheet} from 'react-native';
import {COLORS} from "../../../constants";

export default StyleSheet.create({
    centerWrap: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 45,
    },
    listHead: {
        width: '100%',

        flexDirection: 'row',
        borderWidth: 2,
        borderColor: COLORS.dark,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    listHeadTitle: {
        textAlign: 'center',
        color: COLORS.dark,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    listRow: {
        borderColor: COLORS.dark,
        borderWidth: 2,
        flexDirection: 'row',
        borderTopWidth: 0,
        borderBottomWidth: 1,
    },
    listRowBox: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: COLORS.dark,
    },
    itemRowText: {
        textAlign: 'center',
        color: COLORS.dark,
        paddingVertical: 5,
    },
});
