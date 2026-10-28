import { ReactNode } from "react"
import { StyleProp, View, ViewStyle } from "react-native";


type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>
}

export const ScreenContainer = ({children, style}: Props) => {
    return (
        <View style={[{flex:1},style]}>
            {children}
        </View>
    )
}