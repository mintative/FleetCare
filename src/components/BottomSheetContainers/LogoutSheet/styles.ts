import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../theme/colors";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    

    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 5,
    },

    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#666666',
        marginBottom: 28,
    },

    scrollContent: {
        flexGrow: 1,
        paddingBottom: 80,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginBottom: 30
    },
    icon: {
        backgroundColor: colors.redLight,
        alignSelf: "flex-start",
        padding:10,
        borderRadius: 999
    },
    actions: {
        flexDirection: "column",
        gap:15,
        borderTopWidth:1,
        borderColor: colors.border
    },
    logout: {
        padding:15,
        backgroundColor: colors.redDark,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 999,
        marginTop: 20,
        borderWidth:1,
        borderColor: colors.redDark,
    },
    logoutText: {
        color: colors.redLight,
        fontSize: 20,
        fontWeight: "bold"
    
    },
    cancel: {
        padding:15,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 999,



    },
    cancelText: {

        fontSize: 20,
        fontWeight: "bold"
    }
});