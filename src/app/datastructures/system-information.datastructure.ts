export class DiskInfo {
  total: number;
  used: number;
  free: number;
  percentage: number;
  unit: string;

  constructor() {
  }
}

export class MemoryInfo {
  total: number;
  available: number;
  percentage: number;
  used: number;
  free: number;
  unit: string;

  constructor() {
  }
}

export class CpuInfo {
  percentage: number;
  minTemp: number;
  maxTemp: number;
  temperature: number;
  unit: string;

  constructor() {
  }
}

export class SystemInformation {
  datetime: string | null = null;
  cpu: CpuInfo = null;
  memory: MemoryInfo = null;
  disk: DiskInfo = null;

  constructor(
    datetime: string,
    cpu: CpuInfo,
    memory: MemoryInfo,
    disk: DiskInfo
  ) {
    this.datetime = datetime;
    this.cpu = cpu;
    this.memory = memory;
    this.disk = disk;
  }
}
