import {StyleSheet} from 'react-native';
import {COLORS} from "../../../constants";

export default StyleSheet.create({
    element: {
        width: "100%",
        padding: 5,
        marginTop: 20,

        paddingHorizontal: 15,
        paddingVertical: 15,
        borderColor: COLORS.black,
        borderWidth: 1,
        backgroundColor: COLORS.light,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',

        fontSize: 19,
        lineHeight: 19,
        color: COLORS.black,
    },
});
