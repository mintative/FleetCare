import { View } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";


type Props = {
    title: string;
    description: string;
}

export const EmptyState = ({title, description}: Props) => {
    return (
        <View style={styles.container}>
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