import { Pressable, View } from "react-native"
import { AppText } from "../AppText"
import { styles } from "./styles";
import BackArrowIcon from "../../assets/icons/back-arrow.svg";
import { PlainText } from "../PlainText";

import BucketIcon from "../../assets/icons/bucket.svg";
import { useTheme } from "../../theme/ThemeContext";
import { colors } from "../../theme/colors";


type Props = {
    onBackPress: ()=>void;
    title:string;
    description?: string;
    onDeleteButtonPress?: ()=>void;
}

export const RepairsHeader = ({onBackPress, onDeleteButtonPress, title, description}: Props) => {
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
                <View style={styles.row}>
                    <View>
                        <AppText style={styles.title}>{title}</AppText>
                        {description && <PlainText style={styles.par}>{description}</PlainText>}
                    </View>
                    {onDeleteButtonPress &&
                    <Pressable
                        onPress={()=>{onDeleteButtonPress()}}
                        style={styles.deleteButton}
                    >
                        <BucketIcon width={25} height={25} color={colors.redDark}/>
                    </Pressable>
                    }
                </View>
                
            </View>
        </View>
    )
}

