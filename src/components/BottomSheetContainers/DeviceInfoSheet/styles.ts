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
        gap: 10,
        marginTop: 20,
        padding:15,
        borderRadius: 20,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        paddingVertical: 5
    },
    separator: {
        height: 1,
        backgroundColor: colors.border
    },
    leftText: {
        fontSize: 16
    },
    rightText: {
        fontSize: 16,
        fontWeight: "bold"
    },
});