import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../theme/colors";


export const styles = EStyleSheet.create({
    mainContainer: {
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    image: {
        width:"100%",
        height:200
    },
    row: {
        marginTop:10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    plateNumber: {
        padding:10,
        backgroundColor: "#ecebeb",
        alignSelf: "flex-start",
        borderRadius: 999,
        fontWeight: "bold",
        
    },
    information: {
        backgroundColor: "#fff",
        borderRadius: 20,
        marginTop: 30,
        padding:20,
    },
    infoList: {
        marginTop:10,  
    },
    infoRow: {
        flexDirection:"row",
        justifyContent: "space-between",
        paddingVertical:10,
    }
});