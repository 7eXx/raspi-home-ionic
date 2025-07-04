import {EnvironmentInformation, HumidityInfo, TemperatureInfo} from './environment-information.datastructure';

export class EnvironmentInfoBuilder {

  private statusPayload: any;
  private timestampPayload: any;
  private temperaturePayload: any;
  private humidityPayload: any;

  constructor() {
  }

  public setStatus(statusPayload: any): EnvironmentInfoBuilder {
    this.statusPayload = statusPayload;
    return this;
  }

  public setTimestamp(timestamp: any): EnvironmentInfoBuilder {
    this.timestampPayload = timestamp;
    return this;
  }

  public setTemperature(temperature: any) {
    this.temperaturePayload = temperature;
    return this;
  }

  public setHumidity(humidity: any) {
    this.humidityPayload = humidity;
    return this;
  }

  public build(): EnvironmentInformation {
    // check status
    if (!this.statusPayload ||
      (this.statusPayload !== 'n/a' && this.statusPayload !== 'online' && this.statusPayload !== 'offline')) {
      throw new Error('Invalid status');
    }

    if (!this.timestampPayload) {
      throw new Error('Invalid timestamp');
    }

    if (!this.temperaturePayload) {
      throw new Error('Invalid temperature');
    }

    if (!this.humidityPayload) {
      throw new Error('Invalid humidity');
    }

    const status = this.statusPayload as 'n/a' | 'online' | 'offline';
    const timestamp = this.timestampPayload as string;
    const temperature = Object.assign(new TemperatureInfo(), this.temperaturePayload);
    const humidity = Object.assign(new HumidityInfo(), this.humidityPayload);

    return new EnvironmentInformation(status, timestamp, temperature, humidity);
  }
}
