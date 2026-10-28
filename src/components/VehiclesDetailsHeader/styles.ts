import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../theme/colors";


export const styles = EStyleSheet.create({
    container: {
        padding: 10,


        flexDirection: "row",
        justifyContent: "space-between"
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap:10
    },
    backButton: {
        padding:8,
        borderRadius: 999,

    },
    editButton: {
        padding:8,
        borderRadius: 999,

    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    par: {
        marginTop: 5,
    }

});