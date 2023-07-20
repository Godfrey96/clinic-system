import { LocalTime } from './localTime';

export class Slot {
  // slotId?: number;
  // time?: Date;
  // dateTime?: Date;
  // patientId?: number;
  // doctorId?: number;

  slotId?: number;
  time?: LocalTime;
  patientId?: number;
  doctorId?: number;
  dateTime?: string;
}
