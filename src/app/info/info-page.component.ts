import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Automation } from '../datastructures/automation.datastructure';
import { HomeBrokerService } from '../services/home-broker.service';

@Component({
  selector: 'app-info',
  templateUrl: 'info-page.component.html',
  styleUrls: ['info-page.component.scss']
})
export class InfoPage implements OnInit {

  title = 'Info';
  isConnected: Observable<boolean>;
  systemStatus: Observable<Automation>;

  constructor(private homeBrokerService: HomeBrokerService) {}

  public ngOnInit(): void {
    this.retrieveSystemStatus();
  }

  private retrieveSystemStatus(): void {
    this.isConnected = this.homeBrokerService.isConnectedAsObservable();
    this.systemStatus = this.homeBrokerService.getSystemStatusAsObservable();
  }

}
