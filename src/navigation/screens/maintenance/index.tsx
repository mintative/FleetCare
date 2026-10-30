import { FlatList, Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import type { MaintenanceStackParamList } from '../../types';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Header } from '../../../components/Header';




import { maintenanceStore} from '../../../stores';


import { EmptyState } from '../../../components/EmptyState';
import { AppText } from '../../../components/AppText';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Repair } from '../../../types';
import { RepairItem } from '../../../components/RepairItem';
import { colors } from '../../../theme/colors';
import { useTheme } from '../../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';


type Props = NativeStackScreenProps<MaintenanceStackParamList, 'MaintenanceMain'>;

type FilterTab = {
  title: string;
  tab: Repair["status"];
}


export const MaintenanceScreen = observer(({ navigation }: Props) => {

  const {theme} = useTheme();
  const {t} = useTranslation();

  const filterTabs : FilterTab[] = useMemo(() => [
    { title: t('maintenance.filters.all'), tab: 'all' as const },
    { title: t('maintenance.filters.planned'), tab: 'planned' as const },
    { title: t('maintenance.filters.in_progress'), tab: 'in_progress' as const },
    { title: t('maintenance.filters.completed'), tab: 'completed' as const },
  ], [t]);



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
              title={t("maintenance.title")}
              par={t("maintenance.description")}
              onAddPress={()=>{navigation.navigate("AddRepair")}}
              style={{padding:20}}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContainer}
            >
              {filterTabs.map((tab) => {
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
            title={selectedTab ? t("maintenance.noRepairs") : t("maintenance.noRepairsYet")}
            description={
              selectedTab
                ? t("maintenance.noRepairsDescription")
                : t("maintenance.noRepairsYetDescription")
            }
            style={{marginHorizontal:20}}
          />
        }
      />

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