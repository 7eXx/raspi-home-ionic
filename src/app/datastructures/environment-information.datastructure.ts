
export class TemperatureInfo {
  value = 'n/a';
  unit = '°C';

  constructor() { }
}

export class HumidityInfo {
  value = 'n/a';
  unit = '%';

  constructor() { }
}

export class EnvironmentInformation {
  status: 'n/a' | 'online' | 'offline';
  timestamp: string | null = null;
  temperature: TemperatureInfo = null;
  humidity: HumidityInfo = null;

  constructor(
    status: 'n/a' | 'online' | 'offline',
    timestamp: string,
    temperature: TemperatureInfo,
    humidity: HumidityInfo) {
    this.status = status;
    this.timestamp = timestamp;
    this.temperature = temperature;
    this.humidity = humidity;
  }
}
