import { Automation } from './automation.datastructure';
import { CpuInfo, DiskInfo, MemoryInfo, SystemInformation } from './system-information.datastructure';

export class AutomationBuilder {

  constructor(private payload: any) {}

  public build(): Automation {
    return new Automation(
      Boolean(this.payload.alarm),
      Boolean(this.payload.ecu),
      Boolean(this.payload.gate),
      this.parseSystemInfo()
    );
  }

  private parseSystemInfo(): SystemInformation {
    const sysPayload = this.payload.systemInfo;
    if (!sysPayload) {
      throw new Error('Error on parse system information');
    }

    return new SystemInformation(
      this.parseDatetime(),
      this.parseCpuInfo(),
      this.parseMemoryInfo(),
      this.parseDiskInfo());
  }

  private parseDatetime(): string {
    const datetime = this.payload.systemInfo?.datetime;
    if (!datetime) {
      throw new Error('Error on parse datetime');
    }

    return datetime as string;
  }

  private parseCpuInfo(): CpuInfo {
    const cpuPayload = this.payload.systemInfo?.cpu;
    if (!cpuPayload) {
      throw new Error('Error on parsing cpu-load info');
    }

    return Object.assign(new CpuInfo(), cpuPayload);
  }

  private parseMemoryInfo(): MemoryInfo {
    const memoryPayload = this.payload.systemInfo?.memory;
    if (!memoryPayload) {
      throw new Error('Error on parsing memory info');
    }

    return Object.assign(new MemoryInfo(), memoryPayload);
  }

  private parseDiskInfo(): DiskInfo {
    const diskPayload = this.payload.systemInfo?.disk;
    if (!diskPayload) {
      throw new Error('Error on parsing disk info');
    }

    return Object.assign(new DiskInfo(), diskPayload);
  }
}
