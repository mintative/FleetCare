import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../theme/colors";


export const styles = EStyleSheet.create({
    container: {
        padding: 10,


        flexDirection: "row",
        justifyContent: "space-between"
    },
    left: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap:10
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    backButton: {
        padding:8,
        borderRadius: 999,
        
    },
    editButton: {
        padding:8,
        borderRadius: 999,

    },
    deleteButton: {
        padding:10,
        borderRadius: 999,
        backgroundColor: colors.redLight,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    par: {
        marginTop: 5,
    }

});