import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeBrokerService} from '../services/home-broker.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {EnvironmentInformation} from '../datastructures/environment-information.datastructure';

@Component({
  selector: 'app-environment-info',
  templateUrl: './environment-info.page.html',
  styleUrls: ['./environment-info.page.scss'],
})
export class EnvironmentInfoPage implements OnInit, OnDestroy {

  isStatusAvailable: Observable<boolean>;
  environmentInfo: EnvironmentInformation;

  private environmentSubscription: Subscription;

  constructor(private homeBrokerService: HomeBrokerService) { }

  ngOnInit() {
    this.isStatusAvailable = combineLatest([
      this.homeBrokerService.isConnectedAsObservable(),
      this.homeBrokerService.isSystemStatusAvailableAsObservable()
    ]).pipe(
      map(([isConnected, isStatusAvailable]) => isConnected && isStatusAvailable));

    this.environmentSubscription = this.homeBrokerService.getSystemStatusAsObservable().pipe(
      filter((status) => !!status),
      map((status) => status.getEnvironmentInformation())
    ).subscribe((environmentInfo) => {
      this.environmentInfo = environmentInfo;
    });
  }

  ngOnDestroy() {
    if (this.environmentSubscription) {
      this.environmentSubscription.unsubscribe();
    }
  }

  onReconnect() {
    this.homeBrokerService.reconnect();
  }

}
