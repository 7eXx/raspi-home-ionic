import {Component, OnInit} from '@angular/core';
import {HomeBrokerService} from '../services/home-broker.service';
import {Observable} from 'rxjs';
import {CommandRequestService} from '../services/command-request.service';

@Component({
  selector: 'app-alarm',
  templateUrl: 'alarm-page.component.html',
  styleUrls: ['alarm-page.component.scss']
})
export class AlarmPage implements OnInit {

  public ecuAlarm: Observable<boolean>;

  constructor(
    private homeBrokerService: HomeBrokerService,
    private commandRequestService: CommandRequestService) {}


  ngOnInit() {
    this.ecuAlarm = this.homeBrokerService.getEcuAlarmAsObservable();

    this.ecuAlarm.subscribe((value) => console.log(value));
  }

  setAlarmEcu(state: number) {
    this.commandRequestService.sendAlarmEcuSet(state);
  }

  toggleAlarmEcu() {
    this.commandRequestService.sendAlarmEcuToggle();
  }
}
