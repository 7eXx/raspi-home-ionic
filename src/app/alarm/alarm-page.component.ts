import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CommandRequestService} from '../services/command-request.service';
import {HomeBrokerService} from '../services/home-broker.service';

@Component({
  selector: 'app-alarm',
  templateUrl: 'alarm-page.component.html',
  styleUrls: ['alarm-page.component.scss']
})
export class AlarmPage implements OnInit {

  isAlarmActive = false;

  statusConnected: Observable<boolean>;
  ecuAlarm: Observable<boolean>;

  constructor(
    private homeBrokerService: HomeBrokerService,
    private commandRequestService: CommandRequestService) {}

  ngOnInit() {
    this.statusConnected = this.homeBrokerService.isConnectedAsObservable();
    this.ecuAlarm = this.homeBrokerService.getEcuAlarmAsObservable();
  }

  onReconnect() {
    this.homeBrokerService.reconnect();
  }

  setAlarmEcu(state: number) {
    this.commandRequestService.sendAlarmEcuSet(state);
  }

  toggleAlarmEcu() {
    this.commandRequestService.sendAlarmEcuToggle();
  }

  toggleAlarm() {
    this.isAlarmActive = !this.isAlarmActive;
  }
}
