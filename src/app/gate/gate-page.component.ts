import {Component, OnInit} from '@angular/core';
import {HomeBrokerService} from '../services/home-broker.service';
import {combineLatest, Observable} from 'rxjs';
import {CommandRequestService} from '../services/command-request.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-gate',
  templateUrl: 'gate-page.component.html',
  styleUrls: ['gate-page.component.scss']
})
export class GatePage implements OnInit {

  isStatusAvailable: Observable<boolean>;
  ecuGate: Observable<boolean>;

  constructor(private homeBrokerService: HomeBrokerService,
              private commandRequestService: CommandRequestService) {}

  ngOnInit(): void {
    this.isStatusAvailable = combineLatest([
      this.homeBrokerService.isConnectedAsObservable(),
      this.homeBrokerService.isSystemStatusAvailableAsObservable()
    ]).pipe(
      map(([isConnected, isStatusAvailable]) => isConnected && isStatusAvailable));
    this.ecuGate = this.homeBrokerService.getGateAsObservable();
  }

  onReconnect()  {
    this.homeBrokerService.reconnect();
  }

  stopGate() {
    this.commandRequestService.sendGateStopToggle();
  }

  toggleGate() {
    this.commandRequestService.sendGateEcuToggle();
  }
}
