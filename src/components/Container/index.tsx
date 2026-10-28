import { ReactNode } from "react";
import { styles } from "./styles"
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}

export const Container = ({children, style}: Props) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

