import {StyleSheet} from 'react-native';
import {COLORS} from "../../../constants";

export default StyleSheet.create({
    element: {
        flex: 1,
        width: "100%",
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxHeight: 45,

        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    elementTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19,
        color: COLORS.black,
    },
});
