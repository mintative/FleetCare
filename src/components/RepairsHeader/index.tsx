import { Pressable, View } from "react-native"
import { AppText } from "../AppText"
import { styles } from "./styles";
import BackArrowIcon from "../../assets/icons/back-arrow.svg";
import { PlainText } from "../PlainText";
import { Vehicle } from "../../types";
import EditIcon from "../../assets/icons/edit.svg";
import { useTheme } from "../../theme/ThemeContext";


type Props = {
    onBackPress: ()=>void;
    title:string;
    description?: string;

}

export const RepairsHeader = ({onBackPress, title, description}: Props) => {
    const {theme} = useTheme();
    
        

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Pressable
                    onPress={()=>{onBackPress()}}
                    style={styles.backButton}
                >
                    <BackArrowIcon  width={30} height={30} color={theme.text}/>
                </Pressable>
                
                <View>
                    <AppText style={styles.title}>{title}</AppText>
                    {description && <PlainText style={styles.par}>{description}</PlainText>}
                </View>
            </View>
        </View>
    )
}

