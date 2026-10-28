import { ReactNode } from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { styles } from "./styles";


type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    onPress?: ()=>void;
    disabled?: boolean; 
}

export const FormButton = ({children, style, onPress, disabled}: Props) => {
    return (
        <Pressable style={[style, styles.button]} disabled={disabled} onPress={onPress}>
            {children}
        </Pressable>
    )
}