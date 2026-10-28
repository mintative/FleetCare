import { makeAutoObservable } from 'mobx';
import 'react-native-get-random-values';
import type { Repair } from '../types';
import { v4 as uuidv4 } from 'uuid';

type RepairStatus = Repair['status'];

class MaintenanceStore {
  repairs: Repair[] = [];

  selectedVehicleId: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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


  get repairHistory(): Repair[] {
    return this.filteredRepairs
      .filter((repair) => repair.status === 'completed')
      .slice()
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime(),
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
      .reduce((total, repair) => total + repair.cost, 0);
  }


  get totalRepairCosts(): number {
    return this.repairs.reduce(
      (total, repair) => total + repair.cost,
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
      .reduce((total, repair) => total + repair.cost, 0);
  }


  setVehicleFilter(vehicleId: string | null): void {
    this.selectedVehicleId = vehicleId;
  }


  addRepair(
    repair: Omit<Repair, 'id'>,
  ): Repair {
    if (!Number.isFinite(repair.cost) || repair.cost < 0) {
      throw new Error('Repair cost should be a positive number');
    }

    if (
      !Number.isFinite(repair.currentMileage) ||
      repair.currentMileage < 0
    ) {
      throw new Error('Mileage should be a positive number');
    }

    const newRepair: Repair = {
      ...repair,
      id: uuidv4(),
    };

    this.repairs.push(newRepair);

    return newRepair;
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
          new Date(b.date).getTime() -
          new Date(a.date).getTime(),
      );
  }


  getVehicleRepairHistory(vehicleId: string): Repair[] {
    return this.getVehicleRepairs(vehicleId).filter(
      (repair) => repair.status === 'completed',
    );
  }


  setRepairs(repairs: Repair[]): void {
    this.repairs = [...repairs];
  }


  removeRepair(id: string): void {
    this.repairs = this.repairs.filter(
      (repair) => repair.id !== id,
    );
  }


  clearRepairs(): void {
    this.repairs = [];
  }
}

const maintenanceStore = new MaintenanceStore();

export default maintenanceStore;