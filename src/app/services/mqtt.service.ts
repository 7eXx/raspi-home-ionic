import {Injectable} from '@angular/core';
import {BrokerInfo} from './broker-info.model';
import {environment} from '../../environments/environment';
import mqtt, {MqttClient} from 'mqtt';
import {Automation} from '../datastructures/automation.datastructure';

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  client: MqttClient;

  brokerInfo: BrokerInfo = {
    hostname: environment.hostMqtt,
    port: +environment.portMqtt,
    timeout: +environment.publishTimeout,
    topic: environment.statusTopic,
  };

  constructor() {
    this.createClient();
  }

  private createClient(): any {
    this.client = mqtt.connect(this.brokerInfo.hostname, {
      port: this.brokerInfo.port,
      connectTimeout: this.brokerInfo.timeout,
    });

    this.client.on('connect', this.onConnect);
    this.client.on('message', this.onMessageArrived);
  }

  private onConnect(): void {
    this.client.subscribe(this.brokerInfo.topic);
    console.log('broker connected');
  }

  private onMessageArrived(topic: string, message: Buffer): void {
    const automation: Automation = JSON.parse(message.toString());
    console.log(automation);
  }
}
