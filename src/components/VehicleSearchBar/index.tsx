import { Pressable, TextInput, View } from "react-native";


import { styles } from "./styles";

import SearchIcon from "../../assets/icons/search.svg";
import FilterIcon from "../../assets/icons/filter.svg";
import CrossIcon from "../../assets/icons/cross.svg";
import { observer } from "mobx-react-lite";
import { vehicleStore } from "../../stores";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onFilterPress: () => void;
};

export const VehicleSearchBar = observer(({
  value,
  onChangeText,
  onFilterPress,
}: Props) => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer,{backgroundColor: theme.card}]}>
        <SearchIcon
            width={20}
            color="#666666"
        />
        <TextInput
          style={[styles.input, {color: theme.text}]}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search by vehicle, plate or VIN"
          placeholderTextColor="#7B87A2"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          
        />

        {value.length > 0 && (
          <Pressable onPress={() => onChangeText("")} hitSlop={10}>
            <CrossIcon />
          </Pressable>
        )}
      </View>

      <Pressable
        style={[styles.filterButton, {backgroundColor:theme.card}, vehicleStore.statusFilter!=="all" && styles.filterButtonActive]}
        onPress={onFilterPress}
        accessibilityRole="button"
        accessibilityLabel="Open vehicle filters"
      >
        <FilterIcon width={30} color={vehicleStore.statusFilter!=="all" ? colors.blueDark : theme.text}/>
      </Pressable>
    </View>
  );
});