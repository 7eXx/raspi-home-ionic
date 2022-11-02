import { AutomationBuilder } from './automation-builder';

describe('Automation Builder testing', () => {

  let payload: any;
  let automationBuilder: AutomationBuilder;

  beforeEach(() => {
    payload = {
      alarm: 1,
      ecu: 0,
      gate: 0,
      systemInfo: {
        cpu: {
          percentage: 13.1,
          minTemp: 0.0,
          maxTemp: 100.0,
          temperature: 56.0,
          unit: '°C'
        },
        memory: {
          total: 11885.48,
          available: 3248.08,
          percentage: 72.7,
          used: 8292.16,
          free: 1357.61,
          unit: 'MB'
        },
        disk: {
          total: 530.51,
          used: 160.34,
          free: 343.15,
          percentage: 31.8,
          unit: 'GB'
        }
      }
    };
  });

  it('should throw error if disk not defined', () => {
    delete payload.systemInfo.disk;
    automationBuilder = new AutomationBuilder(payload);
    const t = () => {
      automationBuilder.parseDiskInfo();
    };
    expect(t).toThrow(Error('Error on parsing disk info'));
  });

  it('should build automation status', () => {
    automationBuilder = new AutomationBuilder(payload);
    const automation = automationBuilder.build();

    expect(automation.getAlarm()).toBeTrue();
    expect(automation.getEcu()).toBeFalse();
    expect(automation.getGate()).toBeFalse();
    expect(automation.getSystemInformation()).toBeDefined();
  });

  it ('should parse system info', () => {
    automationBuilder = new AutomationBuilder(payload);
    const systemInfo = automationBuilder.parseSystemInfo();
    expect(systemInfo).toBeDefined();
  });

  it('should parse cpu info from payload', () => {
    automationBuilder = new AutomationBuilder(payload);
    const cpu = automationBuilder.parseCpuInfo();
    expect(cpu.percentage).toBe(13.1);
    expect(cpu.minTemp).toBe(0.0);
    expect(cpu.maxTemp).toBe(100.0);
    expect(cpu.temperature).toBe(56.0);
  });

  it('should parse memory info from payload', () => {
    automationBuilder = new AutomationBuilder(payload);
    const memory = automationBuilder.parseMemoryInfo();
    expect(memory.total).toBe(11885.48);
    expect(memory.available).toBe(3248.08);
    expect(memory.percentage).toBe(72.7);
    expect(memory.used).toBe(8292.16);
    expect(memory.free).toBe(1357.61);
    expect(memory.unit).toBe('MB');
  });

  it('should parse disk info from payload', () => {
    automationBuilder = new AutomationBuilder(payload);
    const disk = automationBuilder.parseDiskInfo();
    expect(disk.total).toBe(530.51);
    expect(disk.used).toBe(160.34);
    expect(disk.free).toBe(343.15);
    expect(disk.percentage).toBe(31.8);
    expect(disk.unit).toBe('GB');
  });
});
