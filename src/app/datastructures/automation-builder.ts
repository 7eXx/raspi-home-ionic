import { Automation } from './automation.datastructure';
import { CpuInfo, DiskInfo, MemoryInfo, SystemInformation } from './system-information.datastructure';

export class AutomationBuilder {

  constructor(private payload: any) {}

  public build(): Automation {
    const automation = new Automation();
    automation.setAlarm(Boolean(this.payload.alarm));
    automation.setEcu(Boolean(this.payload.ecu));
    automation.setGate(Boolean(this.payload.gate));
    automation.setSystemInfo(this.parseSystemInfo());

    return automation;
  }

  public parseSystemInfo(): SystemInformation {
    const sysPayload = this.payload.systemInfo;
    if (!sysPayload) {
      throw new Error('Error on parse system information');
    }

    return new SystemInformation()
      .setCpuInfo(this.parseCpuInfo())
      .setMemoryInfo(this.parseMemoryInfo())
      .setDiskInfo(this.parseDiskInfo());
  }

  public parseCpuInfo(): CpuInfo {
    const cpuPayload = this.payload.systemInfo?.cpu;
    if (!cpuPayload) {
      throw new Error('Error on parsing cpu info');
    }

    return Object.assign(new CpuInfo(), cpuPayload);
  }

  public parseMemoryInfo(): MemoryInfo {
    const memoryPayload = this.payload.systemInfo?.memory;
    if (!memoryPayload) {
      throw new Error('Error on parsing memory info');
    }

    return Object.assign(new MemoryInfo(), memoryPayload);
  }

  public parseDiskInfo(): DiskInfo {
    const diskPayload = this.payload.systemInfo?.disk;
    if (!diskPayload) {
      throw new Error('Error on parsing disk info');
    }

    return Object.assign(new DiskInfo(), diskPayload);
  }
}
