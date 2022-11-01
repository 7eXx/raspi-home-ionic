import {Injectable} from '@angular/core';
import { IMqttServiceOptions, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import {environment} from '../../environments/environment';
import {Automation} from '../datastructures/automation.datastructure';



@Injectable({
  providedIn: 'root'
})
export class HomeBrokerService {
  private subscription: Subscription;
  private isConnection = false;

  constructor(private mqttService: MqttService) {
    this.createConnection();
  }

  private createConnection(): void {
    try {
      this.mqttService.connect();
    } catch (error) {
      console.error('mqtt.connect error: ', error);
    }

    this.mqttService.onConnect.subscribe(() => this.onConnect());
    this.mqttService.onError.subscribe((error: any) => this.onError(error));
    this.mqttService.onMessage.subscribe((packet: any) => this.onMessageArrived(packet));
  }

  private onConnect(): void {
    this.isConnection = true;
    console.log('Connection succeeded!');
  }

  private onError(error: any): void {
    console.error('Connection failed', error);
    this.destroyConnection();
  }

  private onMessageArrived(packet: any): void {
    const { topic, payload } = packet;
    console.log(`Received message ${payload.toString()} from topic ${topic}`);
  }

  private destroyConnection(): void {
    try {
      this.mqttService.disconnect();
      this.isConnection = false;
      console.log('Successfully disconnected!');
    } catch (err) {
        console.error('Disconnect failed', err);
    }
  }
}
