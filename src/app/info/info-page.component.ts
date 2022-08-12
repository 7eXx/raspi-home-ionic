import { Component } from '@angular/core';
import {MqttService} from '../services/mqtt.service';

@Component({
  selector: 'app-info',
  templateUrl: 'info-page.component.html',
  styleUrls: ['info-page.component.scss']
})
export class InfoPage {

  title = 'Info';

  constructor(private mqttService: MqttService) {}

}
