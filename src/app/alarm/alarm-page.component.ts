import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {CommandRequestService} from '../services/command-request.service';
import {HomeBrokerService} from '../services/home-broker.service';
import {map} from 'rxjs/operators';
import {Vibration} from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-alarm',
  templateUrl: 'alarm-page.component.html',
  styleUrls: ['alarm-page.component.scss']
})
export class AlarmPage implements OnInit {

  statusConnected: Observable<boolean>;
  isStatusAvailable: Observable<boolean>;
  ecuAlarm: Observable<boolean>;

  constructor(
    private vibration: Vibration,
    private homeBrokerService: HomeBrokerService,
    private commandRequestService: CommandRequestService) {}

  ngOnInit() {
    this.isStatusAvailable = combineLatest([
      this.homeBrokerService.isConnectedAsObservable(),
      this.homeBrokerService.isSystemStatusAvailableAsObservable()
    ]).pipe(
      map(([isConnected, isStatusAvailable]) => isConnected && isStatusAvailable));
    this.ecuAlarm = this.homeBrokerService.getEcuAlarmAsObservable();
  }

  onReconnect() {
    this.homeBrokerService.reconnect();
  }

  toggleAlarmEcu() {
    this.commandRequestService.sendAlarmEcuToggle();
    this.vibration.vibrate(500);
  }
}
