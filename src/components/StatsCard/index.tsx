import { ComponentType, ReactSVGElement, SVGProps } from "react"
import { View } from "react-native"
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import { styles } from "./styles";
import { Container } from "../Container";
import { SvgProps } from "react-native-svg";

type Props = {
    Icon: ComponentType<SvgProps>;
    number: number;
    par: string;
    lightColor: string;
    darkColor: string;
}

export const StatsCard = ({Icon, number, par, lightColor, darkColor}: Props) => {
    return (
        <Container style={[styles.container, {backgroundColor: lightColor}]}>
            <View style={{flexDirection:"row", alignItems: "center", justifyContent:"space-between"}}>
                <AppText style={styles.number}>{number}</AppText>
                <View style={[styles.dot, {backgroundColor: darkColor}]}/>
                
            </View>
            
            <PlainText>{par}</PlainText>
        </Container>
    )
}