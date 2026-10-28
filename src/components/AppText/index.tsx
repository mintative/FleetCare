import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native"
import { useTheme } from "../../theme/ThemeContext";

type Props = {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
}

export const AppText = ({children, style}: Props) => {
    const {theme} = useTheme();
    return (
        <Text style={[{fontFamily:"Manrope", color: theme.text},style]}>
            {children}
        </Text>
    )
}