export interface DiskInfo {
    total: number;
    used: number;
    free: number;
    percentage: number;
    unit: string;
}

export interface MemoryInfo {
    total: number;
    available: number;
    percentage: number;
    used: number;
    free: number;
    unit: string;
}

export interface CpuInfo {
    percentage: number;
    minTemp: number;
    maxTemp: number;
    temperature: number;
    unit: string;
}

export interface SystemInformation {
    cpu: CpuInfo;
    memory: MemoryInfo;
    disk: DiskInfo;
}
