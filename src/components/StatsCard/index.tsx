import { ComponentType, ReactSVGElement, SVGProps, useEffect } from "react"
import { View } from "react-native"
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import { styles } from "./styles";
import { Container } from "../Container";
import { SvgProps } from "react-native-svg";
import { createAnimatedComponent, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

type Props = {
    Icon: ComponentType<SvgProps>;
    number: number;
    par: string;
    lightColor: string;
    darkColor: string;
}

const AnimatedContainer = createAnimatedComponent(Container);

export const StatsCard = ({Icon, number, par, lightColor, darkColor}: Props) => {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0);
    const isFocused = useIsFocused();

    const animatedStyle = useAnimatedStyle(()=>{
        return {
            opacity: opacity.value,
            transform:[{scale: scale.value}]
        }
    });

    useEffect(()=>{
        if (isFocused) {
            opacity.value = withTiming(1, { duration: 400 });
            scale.value = withTiming(1, { duration: 200 });
        }
        else {
            opacity.value = 0;
            scale.value = 0;
        }
        
    },[isFocused]);

    return (
        <AnimatedContainer style={[styles.container, {backgroundColor: lightColor}, animatedStyle]}>
            <View style={{flexDirection:"row", alignItems: "center", justifyContent:"space-between"}}>
                <AppText style={[styles.number, {color:"#000"}]}>{number}</AppText>
                <View style={[styles.dot, {backgroundColor: darkColor}]}/>
                
            </View>
            
            <PlainText>{par}</PlainText>
        </AnimatedContainer>
    )
}