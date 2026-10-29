import { StyleProp, View, ViewStyle } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import { useTheme } from "../../theme/ThemeContext";


type Props = {
    title: string;
    description: string;
    style?: StyleProp<ViewStyle>;
}

export const EmptyState = ({title, description, style}: Props) => {
    const {theme} = useTheme();

    return (
        <View style={[styles.container,  {backgroundColor:theme.card}, style]}>
            <AppText style={styles.title}>{title}</AppText>
            <PlainText style={styles.description}>{description}</PlainText>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#ddd",
        padding: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    description: {
        marginTop: 10,
    }
});