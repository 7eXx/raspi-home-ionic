import {Injectable} from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {AutomationBuilder} from '../datastructures/automation-builder';
import {Automation} from '../datastructures/automation.datastructure';
import {filter, map} from 'rxjs/operators';
import {HomeBrokerService} from './home-broker.service';

@Injectable()
export class HomeBrokerServiceImpl extends HomeBrokerService {
  private messageSub: Subscription;
  private connectSub: Subscription;
  private errorSub: Subscription;
  private offlineSub: Subscription;

  private isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private systemStatus: BehaviorSubject<Automation> = new BehaviorSubject<Automation>(null);

  constructor(private mqttService: MqttService) {
    super();
    this.createConnection();
  }

  public isConnectedAsObservable(): Observable<boolean> {
    return this.isConnected.asObservable();
  }

  public getSystemStatusAsObservable(): Observable<Automation> {
    return this.systemStatus.asObservable();
  }

  public getEcuAlarmAsObservable(): Observable<boolean> {
    return this.getSystemStatusAsObservable().pipe(
      filter((status) => !!status),
      map((status: Automation) => status.getEcu()));
  }

  public reconnect() {
    this.unsubscribeAll();
    this.disconnect();
    this.createConnection();
  }

  private createConnection(): void {
    this.mqttService.connect();

    this.connectSub = this.mqttService.onConnect.subscribe(() => this.onConnect());
    this.errorSub = this.mqttService.onError.subscribe((error: any) => this.onError(error));
    this.offlineSub = this.mqttService.onOffline.subscribe(() => this.onOffline());

    this.messageSub = this.mqttService.observe(environment.mqtt.statusTopic).subscribe(
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

  private onOffline() {
    console.log('Mqtt Offline');
    this.destroyService();
  }

  private handleStatus(message: IMqttMessage): void {
    const { topic, payload } = message;
    const automation = new AutomationBuilder(JSON.parse(payload.toString())).build();
    this.systemStatus.next(automation);
  }

  private destroyService(): void {
    this.unsubscribeMessage();
    this.disconnect();
  }

  private unsubscribeAll() {
    this.unsubscribeMessage();
    this.unsubscribeConnect();
    this.unsubscribeError();
    this.unsubscribeOffline();
  }

  private unsubscribeMessage(): void {
    if (this.messageSub) {
      this.messageSub.unsubscribe();
    }
  }

  private unsubscribeConnect() {
    if (this.connectSub) {
      this.connectSub.unsubscribe();
    }
  }

  private unsubscribeError() {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }

  private unsubscribeOffline() {
    if (this.offlineSub) {
      this.offlineSub.unsubscribe();
    }
  }

  private disconnect(): void {
    this.isConnected.next(false);
    this.mqttService.disconnect();
    console.log('Successfully disconnected!');
  }
}
