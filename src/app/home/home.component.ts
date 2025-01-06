import { Component, OnInit } from '@angular/core';
import {Vibration} from '@ionic-native/vibration/ngx';
import {HomeBrokerService} from '../services/home-broker.service';
import {CommandRequestService} from '../services/command-request.service';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  isStatusAvailable: Observable<boolean>;
  ecuAlarm: Observable<boolean>;


  constructor(
    private vibration: Vibration,
    private homeBrokerService: HomeBrokerService,
    private commandRequestService: CommandRequestService,
  ) { }

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

  async toggleHomeAway() {
    this.commandRequestService.sendHomeAwayModeToggle();
    this.vibration.vibrate(300);
  }
}
