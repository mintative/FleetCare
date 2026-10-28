
import { ReactNode } from "react"
import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";


type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>
}

export const ScreenContainer = ({children, style}: Props) => {
    const { theme, isDark, toggleTheme } = useTheme();

    return (
        <View style={[{flex:1, backgroundColor: theme.background},style]}>
            {children}
        </View>
    )
}