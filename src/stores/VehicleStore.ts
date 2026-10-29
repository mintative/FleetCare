import { makeAutoObservable, runInAction } from 'mobx';
import 'react-native-get-random-values';
import type { Vehicle, VehicleStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InspectionStatus = "ok" | "overdue" | "soon";

const VEHICLES_KEY = "@vehicles_data"

class VehicleStore {
  vehicles: Vehicle[] = [];

  searchQuery = '';

  statusFilter: VehicleStatus | 'all' = 'all';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadFromStorage();
  }

  private async saveToStorage() {
    try{
      await AsyncStorage.setItem(VEHICLES_KEY, JSON.stringify(this.vehicles))
      return;
    }
    catch {
      throw new Error("Cannot save vehicles to storage");
    }
    
  }
  private async loadFromStorage() {
    try {
      const data = await AsyncStorage.getItem(VEHICLES_KEY);
      if (data) {
        const parsed: Vehicle[] = JSON.parse(data);
        

        const formatted = parsed.map((v) => ({
          ...v,
          firstRegistration: v.firstRegistration ? new Date(v.firstRegistration) : undefined,
          inspectionDate: v.inspectionDate ? new Date(v.inspectionDate) : undefined,
        }));

        runInAction(() => {
          this.vehicles = formatted;
        });
      }
    } catch {
      console.error("Cannot load vehicles from storage");
    }
  }

  get filteredVehicles(): Vehicle[] {
    const query = this.searchQuery.trim().toLowerCase();

    const filtered =  this.vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.plateNumber.toLowerCase().includes(query) ||
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query);

      const matchesStatus =
        this.statusFilter === 'all' ||
        vehicle.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });

    const statusPriority: Record<VehicleStatus, number> = {
      active: 1,
      maintenance: 2,
      inactive: 3,
    };
    return [...filtered].sort((a, b) => {
      const priorityA = statusPriority[a.status] ?? 99;
      const priorityB = statusPriority[b.status] ?? 99;

      return priorityA - priorityB;
    });
  }


  get totalVehicles(): number {
    return this.vehicles.length;
  }


  get activeVehicles(): number {
    return this.vehicles.filter(
      (vehicle) => vehicle.status === 'active',
    ).length;
  }

  get maintenanceVehicles():number {
    return this.vehicles.filter(
        (vehicle)=> vehicle.status === 'maintenance',
    ).length;
  }

  get inspectionWarningVehicles(): number {
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    return this.vehicles.filter((vehicle) => {
        if (!vehicle.inspectionDate) return false;

        const timeLeft = vehicle.inspectionDate.getTime() - now;

        return timeLeft > 0 && timeLeft < thirtyDays;
    }).length;
    }

  get overDueVehicles(): number {
    const now = Date.now();

    return this.vehicles.filter((vehicle) => {
        if (!vehicle.inspectionDate) return false;

        const timeLeft = vehicle.inspectionDate.getTime() - now;

        return timeLeft < 0;
    }).length;
  }

  getInspectionStatus(id: string): InspectionStatus {
      const vehicle = this.vehicles.find(v=>v.id===id);
      const now = Date.now();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;

      if (!vehicle?.inspectionDate) return "overdue";

      const timeLeft = vehicle.inspectionDate.getTime() - now;

      if (timeLeft<0) {
        return "overdue";
      }
      else if (timeLeft< thirtyDays) {
        return "soon";
      }
      else {
        return "ok";
      }
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }


  setStatusFilter(status: VehicleStatus | 'all'): void {
    this.statusFilter = status;
  }


  getVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find((vehicle) => vehicle.id === id);
  }


  addVehicle(
    vehicle: Omit<Vehicle, 'id'>,
  ): Vehicle {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: uuidv4(),
    };

    this.vehicles.push(newVehicle);
    this.saveToStorage();

    return newVehicle;
  }


  updateVehicle(
    id: string,
    updates: Partial<Omit<Vehicle, 'id'>>,
  ): void {
    const vehicle = this.getVehicleById(id);

    if (!vehicle) {
      throw new Error(`Vehicel with ID ${id} was not found`);
    }

    Object.assign(vehicle, updates);
    this.saveToStorage();
  }


  removeVehicle(id: string): void {
    this.vehicles = this.vehicles.filter(
      (vehicle) => vehicle.id !== id,
    );
    this.saveToStorage();
  }


  setVehicleStatus(
    id: string,
    status: VehicleStatus,
  ): void {
    this.updateVehicle(id, { status });
    this.saveToStorage();
  }


  setVehicles(vehicles: Vehicle[]): void {
    this.vehicles = [...vehicles];
    this.saveToStorage();
  }


  clearVehicles(): void {
    this.vehicles = [];
    this.saveToStorage();
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;