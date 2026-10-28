import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native"

type Props = {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
}

export const PlainText = ({children, style}: Props) => {
    return (
        <Text style={[{fontFamily:"Manrope", fontSize:16, color:"#666666"},style]}>
            {children}
        </Text>
    )
}