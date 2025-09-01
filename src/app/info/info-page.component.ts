import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription} from 'rxjs';
import { HomeBrokerService } from '../services/home-broker.service';
import {filter, map} from 'rxjs/operators';
import {WakeOnLanRequestService} from '../services/wake-on-lan-request.service';
import {SystemInformation} from '../datastructures/system-information.datastructure';

@Component({
  selector: 'app-info',
  templateUrl: 'info-page.component.html',
  styleUrls: ['info-page.component.scss']
})
export class InfoPage implements OnInit, OnDestroy {

  isStatusAvailable: Observable<boolean>;
  systemInfo: SystemInformation;

  private systemInfoSubscription: Subscription;

  constructor(private homeBrokerService: HomeBrokerService,
              public wakeOnLanRequestService: WakeOnLanRequestService) {}

  public ngOnInit(): void {
    this.isStatusAvailable = combineLatest([
      this.homeBrokerService.isConnectedAsObservable(),
      this.homeBrokerService.isSystemStatusAvailableAsObservable()
    ]).pipe(
      map(([isConnected, isStatusAvailable]) => isConnected && isStatusAvailable));

    this.systemInfoSubscription = this.homeBrokerService.getSystemStatusAsObservable().pipe(
        filter((status) => !!status),
        map(status => status.getSystemInformation())
    ).subscribe((systemInfo) => {
      this.systemInfo = systemInfo;
    });
  }

  ngOnDestroy() {
    if (this.systemInfoSubscription) {
      this.systemInfoSubscription.unsubscribe();
    }
  }

  onReconnect()  {
    this.homeBrokerService.reconnect();
  }
}
