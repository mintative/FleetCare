import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../../theme/colors";

export const styles = EStyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        marginTop:20,
        width: 300,
        fontSize: 18,
    },
    title: {
        fontSize: 32,
        fontWeight: 600
    },
    button: {
        marginTop:20,
        width: 300
    }
});