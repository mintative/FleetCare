import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../theme/colors";

export const styles = EStyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        flexDirection: "row",
        gap: 10
    },
    image: {
        width: 120,
        height: 120,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    row: {
        flexDirection:"row", 
        alignItems:"center", 
        gap: 10,
        marginTop: 10
    },
    plateNumber: {
        padding:5,
        backgroundColor: "#ecebeb",
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


    
});