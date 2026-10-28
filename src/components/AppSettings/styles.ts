import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {

        textTransform: "uppercase",
    },

    buttonContainer: {
        padding:10,
        borderRadius: 20,
        marginTop: 10,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap:10
    },
    right: {
        flexDirection: "row",
        alignItems: "center",
        gap:10
    },
    icon: {
        padding:10,
        alignSelf: "flex-start",
        borderRadius: 999
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    lang: {
        fontSize: 18,
        fontWeight: 600
    }
    
});