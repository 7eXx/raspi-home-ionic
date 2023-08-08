import {Component, OnInit} from '@angular/core';
import {HomeBrokerService} from '../services/home-broker.service';
import {Observable} from 'rxjs';
import {CommandRequestService} from '../services/command-request.service';
import {bufferToggle} from "rxjs/operators";

@Component({
  selector: 'app-alarm',
  templateUrl: 'alarm-page.component.html',
  styleUrls: ['alarm-page.component.scss']
})
export class AlarmPage implements OnInit {

  isAlarmActive = false;

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

  toggleAlarm() {
    this.isAlarmActive = !this.isAlarmActive;
  }

  protected readonly bufferToggle = bufferToggle;
}
