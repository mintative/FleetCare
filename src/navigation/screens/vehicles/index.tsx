import { FlatList, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import type { VehiclesStackParamList } from '../../types';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Header } from '../../../components/Header';
import BottomSheet, { BottomSheetRef } from '../../../components/BottomSheet';
import { AddVehicleSheet } from '../../../components/BottomSheetContainers/AddVehicleSheet/AddVehicleSheet';
import { VehicleItem } from '../../../components/VehicleItem';
import { PlainText } from '../../../components/PlainText';
import { vehicleStore } from '../../../stores';
import { VehicleSearchBar } from '../../../components/VehicleSearchBar';
import { FilterVehiclesSheet } from '../../../components/BottomSheetContainers/FilterVehiclesSheet/FilterVehiclesSheet';
import { EmptyState } from '../../../components/EmptyState';
import { authStore } from '../../../stores/AuthStore';

type Props = NativeStackScreenProps<VehiclesStackParamList, 'VehiclesMain'>;

export const VehiclesScreen = observer(({ navigation }: Props) => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const filterSheetRef = useRef<BottomSheetRef>(null);
  const [value, setValue] = useState<string>("");



  const deferredQuery = useDeferredValue(value);
  useEffect(() => {
    vehicleStore.setSearchQuery(deferredQuery);
  }, [deferredQuery]);

  
  const vehicles = vehicleStore.filteredVehicles;


  return (
    <ScreenContainer>
      <FlatList
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VehicleItem item={item}  onPress={() => navigation.navigate('VehicleDetails', { vehicleId: item.id })}/>}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListHeaderComponent={
          <View style={{marginBottom:30}}>
            <Header
              title="Vehicles"
              par="Manage your fleet"
              onAddPress={() => sheetRef.current?.open()}
            />

            <VehicleSearchBar 
              value={value}
              onChangeText={setValue}
              onFilterPress={() => filterSheetRef.current?.open()}
            />

            <PlainText style={{marginTop:20}}>
              {vehicleStore.totalVehicles} vehicles
            </PlainText>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title={value ? 'No vehicles found' : 'No vehicles yet'}
            description={
              value
                ? 'Try changing your search or filters.'
                : 'Add your first vehicle to manage your fleet.'
            }
          />
        }
      />

      <BottomSheet
        ref={sheetRef}
        snapPoints={['90%']}
      >
        <AddVehicleSheet onClose={() => sheetRef.current?.close()} />
      </BottomSheet>
      <BottomSheet
        ref={filterSheetRef}
        snapPoints={['40%']}
      >
        <FilterVehiclesSheet onClose={() => filterSheetRef.current?.close()} />
      </BottomSheet>
    </ScreenContainer>
  );
});