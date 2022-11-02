export class DiskInfo {
    total: number;
    used: number;
    free: number;
    percentage: number;
    unit: string;

    constructor() {}
}

export class MemoryInfo {
    total: number;
    available: number;
    percentage: number;
    used: number;
    free: number;
    unit: string;

    constructor() {}
}

export class CpuInfo {
    percentage: number;
    minTemp: number;
    maxTemp: number;
    temperature: number;
    unit: string;

    constructor() { }
}

export class SystemInformation {
    cpu: CpuInfo = null;
    memory: MemoryInfo = null;
    disk: DiskInfo = null;

    constructor() {
    }

    public setCpuInfo(cpu: CpuInfo): SystemInformation {
      this.cpu = cpu;
      return this;
    }

    public setMemoryInfo(memory: MemoryInfo): SystemInformation {
      this.memory = memory;
      return this;
    }

    public setDiskInfo(disk: DiskInfo): SystemInformation {
      this.disk = disk;
      return this;
    }
}
