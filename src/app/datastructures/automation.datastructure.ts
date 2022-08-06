import { SystemInformation } from './system-information.datastructure';

export interface Automation {
  alarm: number;
  ecu: number;
  gate: number;
  systemInfo: SystemInformation;
}
