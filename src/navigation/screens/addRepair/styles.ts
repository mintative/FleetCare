import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../theme/colors";


export const styles = EStyleSheet.create({
    mainContainer: {

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

        alignSelf: "flex-start",
        borderRadius: 999,
        fontWeight: "bold",
        borderWidth: 1,
        borderColor: colors.border
        
    },
    information: {

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
    },
    selectionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding:15,
        borderWidth:1,
        borderColor: colors.border,
        borderRadius: 999,
        marginTop:10,
    },
    selectionText: {
        fontSize: 20,
        fontWeight: 400,
        color:"#666666"
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
    },
});