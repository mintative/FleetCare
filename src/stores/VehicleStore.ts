import { makeAutoObservable } from 'mobx';
import 'react-native-get-random-values';
import type { Vehicle, VehicleStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';

type InspectionStatus = "ok" | "overdue" | "soon";

class VehicleStore {
  vehicles: Vehicle[] = [];

  searchQuery = '';

  statusFilter: VehicleStatus | 'all' = 'all';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }


  get filteredVehicles(): Vehicle[] {
    const query = this.searchQuery.trim().toLowerCase();

    return this.vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.plateNumber.toLowerCase().includes(query) ||
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query);

      const matchesStatus =
        this.statusFilter === 'all' ||
        vehicle.status === this.statusFilter;

      return matchesSearch && matchesStatus;
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
  }


  removeVehicle(id: string): void {
    this.vehicles = this.vehicles.filter(
      (vehicle) => vehicle.id !== id,
    );
  }


  setVehicleStatus(
    id: string,
    status: VehicleStatus,
  ): void {
    this.updateVehicle(id, { status });
  }


  setVehicles(vehicles: Vehicle[]): void {
    this.vehicles = [...vehicles];
  }


  clearVehicles(): void {
    this.vehicles = [];
  }
}

const vehicleStore = new VehicleStore();

export default vehicleStore;