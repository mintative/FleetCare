import { Pressable, View } from "react-native"
import { AppText } from "../AppText"
import { styles } from "./styles";
import BackArrowIcon from "../../assets/icons/back-arrow.svg";
import { PlainText } from "../PlainText";
import { Vehicle } from "../../types";
import EditIcon from "../../assets/icons/edit.svg";
import ShareIcon from "../../assets/icons/share.svg";
import { useTheme } from "../../theme/ThemeContext";


type Props = {
    onBackPress: ()=>void;
    onEditPress: ()=>void;
    vehicle: Vehicle;
    onSharePress?: ()=>void;
}

export const VehicleDetailsHeader = ({onBackPress, onEditPress, vehicle, onSharePress}: Props) => {
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
                    <AppText style={styles.title}>{vehicle.brand} {vehicle.model}</AppText>
                    <PlainText style={styles.par}>{vehicle.plateNumber}</PlainText>
                </View>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <Pressable
                    onPress={()=>{onEditPress()}}
                    style={styles.editButton}
                >
                    <EditIcon  width={25} height={25} color={theme.text}/>
                </Pressable>
                {onSharePress &&
                <Pressable
                    onPress={()=>{onSharePress()}}
                    style={styles.editButton}
                >
                    <ShareIcon  width={25} height={25} color={theme.text}/>
                </Pressable>
                }
            </View>
            
        </View>
    )
}

