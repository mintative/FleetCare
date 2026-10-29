import { StyleProp, View, ViewStyle } from "react-native"
import { PlainText } from "../PlainText"
import EStyleSheet from "react-native-extended-stylesheet"
import { colors } from "../../theme/colors";
import { observer } from "mobx-react-lite";

type Props = {
    title: string;
    type: "success" | "warning" | "plain" | "danger";
    style?: StyleProp<ViewStyle>;
}


export const Badge = ({title, type, style}: Props) => {
    let backgroundColor;
    let textColor;

    switch (type) {
        case "success":
            backgroundColor = colors.greenLight;
            textColor = colors.greenDark;
            break;
        case "warning":
            backgroundColor = colors.orangeLight;
            textColor = colors.orangeDark;
            break;
        case "danger":
            backgroundColor = colors.redLight;
            textColor = colors.redLight;
            break;
        default:
            backgroundColor = "#f1f1f1";
            textColor = "#666666";
            break;
    }


    return (
        <View style={[styles.status, {backgroundColor}, style]} >
          <View style={[styles.statusDot, {backgroundColor: textColor}]} />

          <PlainText style={[styles.statusText, {color:textColor}]}>{title}</PlainText>
        </View>
    )
};

const styles = EStyleSheet.create({
    status: {
        flexDirection: "row",
        alignSelf: "flex-start",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 24,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 6,

    },

    statusText: {
        fontWeight: "600",

    },
});