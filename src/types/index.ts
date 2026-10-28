export interface Inspection {
  id: string;
  vehicleId: string;
  title: string;
  dueDate: string;
  completedAt?: string;
}

export interface Repair {
  id: string;
  vehicleId: string;
  title: string;
  description?: string;
  priority: "low"| "medium" | "high" | "critical";
  currentMileage: number;
  date: string;
  cost: number;
  status: 'planned' | 'in_progress' | 'completed';
}

export type VehicleStatus =
  | 'active'
  | 'maintenance'
  | 'inactive';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plateNumber: string;
  year: number;
  mileage?: number;
  fuel: string;
  status: VehicleStatus;
  imageUri?: string | number;
  inspectionDate?: Date;

  VIN?: string;
  firstRegistration?: Date;
}