import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native"

type Props = {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
}

export const AppText = ({children, style}: Props) => {
    return (
        <Text style={[{fontFamily:"Manrope"},style]}>
            {children}
        </Text>
    )
}