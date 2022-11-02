import { SystemInformation } from './system-information.datastructure';

export class Automation {
  private alarm: boolean;
  private ecu: boolean;
  private gate: boolean;
  private systemInfo: SystemInformation = null;

  constructor() { }

  public setSystemInfo(systemInfo: SystemInformation): Automation {
    this.systemInfo = systemInfo;
    return this;
  }

  public setAlarm(alarm: boolean): Automation {
    this.alarm = alarm;
    return this;
  }

  public setEcu(ecu: boolean): Automation {
    this.ecu = ecu;
    return this;
  }

  public setGate(gate: boolean): Automation {
    this.gate = gate;
    return this;
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
}
