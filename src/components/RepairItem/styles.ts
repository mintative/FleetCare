import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../theme/colors";

export const styles = EStyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 20,


    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width:"100%",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    row: {
        flexDirection:"row", 
        alignItems:"center", 
        gap: 10,
        marginTop: 5
    },
    plateNumber: {
        alignSelf: "flex-start",
        borderRadius: 999,
        fontWeight: "bold",
    },
    year: {
        padding: 5,
    },
    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
        marginTop: 10,
    },

    detail: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    mileage: {

        color: "#7B87A2",
    },

    info: {
        marginTop: 20
    },
    repairTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    repairDescription: {
        marginTop: 10
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        marginTop: 20,

        borderTopWidth:1,
        borderColor: colors.border,
    },
    priority: {
        fontSize: 18,
        fontWeight: "bold"
    },
    date: {
        fontWeight: 600
    },
    editButton: {
        padding:10,
        flexDirection: "row",
        gap:10
        
    },
    editText: {
        fontSize: 18,
        fontWeight: 600
    }
});