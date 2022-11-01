import {Injectable} from '@angular/core';
import { IMqttServiceOptions, MqttService, IMqttMessage } from 'ngx-mqtt';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {environment} from '../../environments/environment';
import {Automation} from '../datastructures/automation.datastructure';



@Injectable({
  providedIn: 'root'
})
export class HomeBrokerService {
  private subscription: Subscription;
  private isConnection = false;
  private systemStatus: BehaviorSubject<Automation> = new BehaviorSubject<Automation>(null);

  constructor(private mqttService: MqttService) {
    this.createConnection();
  }

  public getSystemStatusAsObservable(): Observable<Automation> {
    return this.systemStatus.asObservable();
  }

  private createConnection(): void {
    try {
      this.mqttService.connect();
    } catch (error) {
      console.error('mqtt.connect error: ', error);
    }

    this.mqttService.onConnect.subscribe(() => this.onConnect());
    this.mqttService.onError.subscribe((error: any) => this.onError(error));

    this.subscription = this.mqttService.observe(environment.mqtt.statusTopic).subscribe(
      (message: IMqttMessage) => this.handleStatus(message));
  }

  private onConnect(): void {
    this.isConnection = true;
    console.log('Connection succeeded!');
  }

  private onError(error: any): void {
    console.error('Connection failed', error);
    this.destroyService();
  }

  private onMessageArrived(packet: any): void {
    const { topic, payload } = packet;
    console.log(`Received message ${payload.toString()} from topic ${topic}`);
  }

  private handleStatus(message: IMqttMessage): void {
    const { topic, payload } = message;
    this.systemStatus.next(JSON.parse(payload.toString()) as Automation);
    console.log(`Received message ${payload.toString()} from topic ${topic}`);
  }


  private destroyService(): void {
    this.destroySubscription();
    this.destroyConnection();
  }

  private destroySubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
