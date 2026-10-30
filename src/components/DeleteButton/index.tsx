import { Pressable, StyleProp, ViewStyle } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../theme/colors";
import { AppText } from "../AppText";
import BucketIcon from "../../assets/icons/bucket.svg";

type Props = {
    title: string;
    onPress: ()=>void;
    style?: StyleProp<ViewStyle>;
}

export const DeleteButton = ({title, onPress, style}: Props) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.button, style]}
        >
            <BucketIcon width={25} height={25} color={colors.redLight}/>
            <AppText style={styles.text}>{title}</AppText>
        </Pressable>
    )
}


const styles = EStyleSheet.create({
    button: {
            padding:15,
            backgroundColor: colors.redDark,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            borderRadius: 999,
            marginTop: 30,
            borderWidth:1,
            borderColor: colors.redDark,
        },
        text: {
            color: colors.redLight,
            fontSize: 20,
            fontWeight: "bold"
        }
});