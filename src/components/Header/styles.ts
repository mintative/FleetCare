import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../theme/colors";


export const styles = EStyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignitems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold"
    },
    par: {
        
        marginTop: 10
    },

    button: {
        width: 48,
        height: 48,

        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryColor,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '400',

        textAlign: 'center',
        includeFontPadding: false,
    },
});