import { Pressable, Text, View } from "react-native"
import { styles } from "./styles"
import { AppText } from "../AppText"
import { PlainText } from "../PlainText"

type Props = {
    title: string;
    par?: string;
    onAddPress?: ()=>void
}

export const Header = (props: Props) => {
    return (
        <View style={styles.container}>
            <View>
                <AppText style={styles.title}>{props.title}</AppText>
                {props.par &&  <PlainText style={styles.par}>{props.par}</PlainText>}
            </View>
            
            {props.onAddPress && (
            <View>
                <Pressable style={styles.button} onPress={props.onAddPress}>
                    <AppText style={styles.buttonText}>+</AppText>
                </Pressable>
            </View>
            )}
            
        </View>
    )
}