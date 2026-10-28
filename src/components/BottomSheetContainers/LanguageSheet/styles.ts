import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../theme/colors";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    

    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 8,
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
    listContainer: {
        flexDirection: "column",
        gap: 10
    },
    buttonContainer: {
        padding:15,
        borderRadius: 20,
        borderWidth:1,
        borderColor: colors.border,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
    leftPart: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    icon: {
        padding: 15,
        borderRadius: 999,
    },
    firstLetters: {
        fontWeight: "bold"
    },
    langInfo: {
        flexDirection: "column",
        gap: 5
    },
    lang: {
        fontSize: 18,
        fontWeight: 600
    },
    checkIcon: {
        padding:10
    }
});