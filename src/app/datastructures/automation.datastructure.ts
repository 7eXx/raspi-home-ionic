import { SystemInformation } from './system-information.datastructure';
import {EnvironmentInformation} from './environment-information.datastructure';

export class Automation {
  private alarm: boolean;
  private ecu: boolean;
  private gate: boolean;
  private systemInfo: SystemInformation = null;
  private environmentInfo: EnvironmentInformation = null;

  constructor(
    alarm: boolean,
    ecu: boolean,
    gate: boolean,
    systemInformation: SystemInformation,
    environmentInformation: EnvironmentInformation,
  ) {
    this.alarm = alarm;
    this.ecu = ecu;
    this.gate = gate;
    this.systemInfo = systemInformation;
    this.environmentInfo = environmentInformation;
  }

  public getAlarm(): boolean {
    return this.alarm;
  }

  public getEcu(): boolean {
    return this.ecu;
  }

  public getGate(): boolean {
    return this.gate;
  }

  public getSystemInformation(): SystemInformation {
    return this.systemInfo;
  }

  public getEnvironmentInformation(): EnvironmentInformation {
    return this.environmentInfo;
  }
}
