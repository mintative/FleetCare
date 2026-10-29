import { makeAutoObservable, runInAction } from 'mobx';
import 'react-native-get-random-values';
import type { Repair } from '../types';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RepairStatus = Repair['status'];

const REPAIRS_KEY = "@repairs_data"

class MaintenanceStore {
  repairs: Repair[] = [];

  selectedVehicleId: string | null = null;

  selectedStatus: RepairStatus = 'all';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadFromStorage();
  }

  private async saveToStorage() {
    try{
      await AsyncStorage.setItem(REPAIRS_KEY, JSON.stringify(this.repairs))
      return;
    }
    catch {
      throw new Error("Cannot save repairs to storage");
    }
    
  }
  private async loadFromStorage() {
    try{
      const repairs = await AsyncStorage.getItem(REPAIRS_KEY);
      runInAction(()=>{
        if (repairs) {
          const parsed = JSON.parse(repairs);
          runInAction(() => {
            this.repairs = parsed;
          });
        }
      });
      
      return;
    }
    catch {
      throw new Error("Cannot load repairs from storage");
    }
    
  }


  get filteredRepairs(): Repair[] {
    if (!this.selectedVehicleId) {
      return this.repairs;
    }

    return this.repairs.filter(
      (repair) =>
        repair.vehicleId === this.selectedVehicleId,
    );
  }
  get filteredRepairsByStatus(): Repair[] {
  const filtered = this.selectedStatus === "all"
    ? this.repairs
    : this.repairs.filter((repair) => repair.status === this.selectedStatus);

  return [...filtered].sort((a, b) => {


    const dateA = new Date(a.date ?? 0).getTime();
    const dateB = new Date(b.date ?? 0).getTime();

    return dateB - dateA; 
  });
}


  get repairHistory(): Repair[] {
    return this.filteredRepairs
      .filter((repair) => repair.status === 'completed')
      .slice()
      .sort(
        (a, b) =>
          new Date(b.date ?? 0).getTime() -
          new Date(a.date ?? 0).getTime(),
      );
  }


  get totalRepairs(): number {
    return this.repairs.length;
  }


  get inProgressRepairs(): number {
    return this.repairs.filter(
      (repair) => repair.status === 'in_progress',
    ).length;
  }


  get totalExpenses(): number {
    return this.repairs
      .filter((repair) => repair.status === 'completed')
      .reduce((total, repair) => total + (repair.cost??0), 0);
  }


  get totalRepairCosts(): number {
    return this.repairs.reduce(
      (total, repair) => total + (repair.cost??0),
      0,
    );
  }


  getVehicleExpenses(vehicleId: string): number {
    return this.repairs
      .filter(
        (repair) =>
          repair.vehicleId === vehicleId &&
          repair.status === 'completed',
      )
      .reduce((total, repair) => total + (repair.cost??0), 0);
  }


  setVehicleFilter(vehicleId: string | null): void {
    this.selectedVehicleId = vehicleId;
  }

  setStatus(status: RepairStatus) {
    this.selectedStatus = status;
  }


  addRepair(
    repair: Omit<Repair, 'id'>,
  ): Repair {
    if (!Number.isFinite(repair.cost) || (repair.cost??0) < 0) {
      throw new Error('Repair cost should be a positive number');
    }


    const newRepair: Repair = {
      ...repair,
      id: uuidv4(),
    };

    this.repairs.push(newRepair);

    this.saveToStorage();
    return newRepair;
  }

  updateRepair(id: string, updatedFields: Partial<Omit<Repair, 'id'>>): void {
    const repair = this.repairs.find((item) => item.id === id);

    if (!repair) {
      throw new Error(`Maintenance with ID ${id} not found`);
    }

    if (
      updatedFields.cost !== undefined &&
      (!Number.isFinite(updatedFields.cost) || updatedFields.cost < 0)
    ) {
      throw new Error('Repair cost should be a positive number');
    }


    Object.assign(repair, updatedFields);
    this.saveToStorage();
  }

  updateRepairStatus(
    id: string,
    status: RepairStatus,
  ): void {
    const repair = this.repairs.find(
      (item) => item.id === id,
    );

    if (!repair) {
      throw new Error(`Ремонт з ID ${id} не знайдено`);
    }

    repair.status = status;
    this.saveToStorage();
  }


  getRepairById(id: string): Repair | undefined {
    return this.repairs.find(
      (repair) => repair.id === id,
    );
  }


  getVehicleRepairs(vehicleId: string): Repair[] {
    return this.repairs
      .filter((repair) => repair.vehicleId === vehicleId)
      .slice()
      .sort(
        (a, b) =>
          new Date(b.date ?? 0).getTime() -
          new Date(a.date ?? 0).getTime(),
      );
  }


  getVehicleRepairHistory(vehicleId: string): Repair[] {
    return this.getVehicleRepairs(vehicleId).filter(
      (repair) => repair.status === 'completed',
    );
  }


  setRepairs(repairs: Repair[]): void {
    this.repairs = [...repairs];
    this.saveToStorage();
  }


  removeRepair(id: string): void {
    this.repairs = this.repairs.filter(
      (repair) => repair.id !== id,
    );
    this.saveToStorage();
  }


  clearRepairs(): void {
    this.repairs = [];
    this.saveToStorage();
  }
}

const maintenanceStore = new MaintenanceStore();

export default maintenanceStore;