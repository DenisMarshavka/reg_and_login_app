import {StyleSheet} from 'react-native';
import {COLORS} from "../../../constants";

export default StyleSheet.create({
    element: {
        width: "100%",
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,

        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    text: {
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: 19,
        color: COLORS.black,
    },
});
