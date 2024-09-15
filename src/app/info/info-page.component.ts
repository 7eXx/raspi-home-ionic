import { Component, OnInit } from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import { Automation } from '../datastructures/automation.datastructure';
import { HomeBrokerService } from '../services/home-broker.service';
import {map} from 'rxjs/operators';
import {WakeOnLanRequestService} from '../services/wake-on-lan-request.service';

@Component({
  selector: 'app-info',
  templateUrl: 'info-page.component.html',
  styleUrls: ['info-page.component.scss']
})
export class InfoPage implements OnInit {

  isStatusAvailable: Observable<boolean>;
  systemStatus: Observable<Automation>;

  constructor(private homeBrokerService: HomeBrokerService,
              public wakeOnLanRequestService: WakeOnLanRequestService) {}

  public ngOnInit(): void {
    this.isStatusAvailable = combineLatest([
      this.homeBrokerService.isConnectedAsObservable(),
      this.homeBrokerService.isSystemStatusAvailableAsObservable()
    ]).pipe(
      map(([isConnected, isStatusAvailable]) => isConnected && isStatusAvailable));

    this.systemStatus = this.homeBrokerService.getSystemStatusAsObservable();
  }

  onReconnect()  {
    this.homeBrokerService.reconnect();
  }
}
