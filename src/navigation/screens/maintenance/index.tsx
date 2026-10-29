import { FlatList, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import type { MaintenanceStackParamList } from '../../types';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Header } from '../../../components/Header';
import BottomSheet, { BottomSheetRef } from '../../../components/BottomSheet';
import { AddVehicleSheet } from '../../../components/BottomSheetContainers/AddVehicleSheet/AddVehicleSheet';
import { VehicleItem } from '../../../components/VehicleItem';

import { maintenanceStore} from '../../../stores';


import { EmptyState } from '../../../components/EmptyState';
import { AppText } from '../../../components/AppText';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Repair } from '../../../types';
import { RepairItem } from '../../../components/RepairItem';
import { colors } from '../../../theme/colors';
import { useTheme } from '../../../theme/ThemeContext';


type Props = NativeStackScreenProps<MaintenanceStackParamList, 'MaintenanceMain'>;

type FilterTab = {
  title: string;
  tab: Repair["status"];
}

export const FILTER_TABS : FilterTab[] = [
  {
    title: "All",
    tab: "all"
  },
{
    title: "Planned",
    tab: "planned"
  },
{
    title: "In progress",
    tab: "in_progress"
  },
{
    title: "Completed",
    tab: "completed"
  }];

export const MaintenanceScreen = observer(({ navigation }: Props) => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const {theme} = useTheme();



  const selectedTab = maintenanceStore.selectedStatus;


  const setStatus = (status: Repair["status"]) => {
    maintenanceStore.setStatus(status);
  }


  
  const repairs = maintenanceStore.filteredRepairsByStatus;


  return (
    <ScreenContainer>
      <FlatList
        contentContainerStyle={{  paddingBottom: 40 }}
        data={repairs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View style={{paddingHorizontal:20}}><RepairItem item={item}  onPress={()=>{navigation.navigate("EditRepair", {repairId:item.id})}}/></View>}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListHeaderComponent={
          <View style={{marginBottom:30}}>
            <Header
              title="Maintenance"
              par="Track repairs and service history"
              onAddPress={()=>{navigation.navigate("AddRepair")}}
              style={{padding:20}}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContainer}
            >
              {FILTER_TABS.map((tab) => {
                const isActive = selectedTab === tab.tab;
                return (
                  <Pressable
                    key={tab.tab}
                    style={[styles.chip, isActive ? styles.activeChip : [styles.inactiveChip, {backgroundColor:theme.card}]]}
                    onPress={() => setStatus(tab.tab)}

                  >
                    <AppText style={[styles.chipText, isActive ? styles.activeChipText : [styles.inactiveChipText, {color:theme.text}]]}>
                      {tab.title}
                    </AppText>
                  </Pressable>
                );
              })}
            </ScrollView>

          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title={selectedTab ? 'No repairs found' : 'No repairs yet'}
            description={
              selectedTab
                ? 'Try changing your filters.'
                : 'Add your first report of repair.'
            }
            style={{marginHorizontal:20}}
          />
        }
      />

      <BottomSheet
        ref={sheetRef}
        snapPoints={['90%']}
      >
        <AddVehicleSheet onClose={() => sheetRef.current?.close()} />
      </BottomSheet>
    </ScreenContainer>
  );
});

const styles = EStyleSheet.create({
  filterContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: colors.primaryColor,

  },
  inactiveChip: {

    borderColor: colors.border,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  inactiveChipText: {
    color: '#666666',
  },
});