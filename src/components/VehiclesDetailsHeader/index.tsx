import { Pressable, View } from "react-native"
import { AppText } from "../AppText"
import { styles } from "./styles";
import BackArrowIcon from "../../assets/icons/back-arrow.svg";
import { PlainText } from "../PlainText";
import { Vehicle } from "../../types";
import EditIcon from "../../assets/icons/edit.svg";


type Props = {
    onBackPress: ()=>void;
    onEditPress: ()=>void;
    vehicle: Vehicle;
}

export const VehicleDetailsHeader = ({onBackPress, onEditPress, vehicle}: Props) => {

    

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Pressable
                    onPress={()=>{onBackPress()}}
                    style={styles.backButton}
                >
                    <BackArrowIcon  width={30} height={30}/>
                </Pressable>
                
                <View>
                    <AppText style={styles.title}>{vehicle.brand} {vehicle.model}</AppText>
                    <PlainText style={styles.par}>{vehicle.plateNumber}</PlainText>
                </View>
            </View>
            <Pressable
                    onPress={()=>{onEditPress()}}
                    style={styles.editButton}
                >
                    <EditIcon  width={25} height={25}/>
                </Pressable>
        </View>
    )
}

