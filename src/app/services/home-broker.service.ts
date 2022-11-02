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
  private isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private systemStatus: BehaviorSubject<Automation> = new BehaviorSubject<Automation>(null);

  constructor(private mqttService: MqttService) {
    this.createConnection();
  }

  public isConnectedAsObservable(): Observable<boolean> {
    return this.isConnected.asObservable();
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
    this.isConnected.next(true);
    console.log('Connection succeeded!');
  }

  private onError(error: any): void {
    console.error('Connection failed', error);
    this.destroyService();
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
      this.isConnected.next(false);
      this.mqttService.disconnect();
      console.log('Successfully disconnected!');
    } catch (err) {
        console.error('Disconnect failed', err);
    }
  }
}
