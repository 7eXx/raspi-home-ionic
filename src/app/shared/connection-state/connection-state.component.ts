import { Component, OnInit } from '@angular/core';
import {HomeBrokerService} from '../../services/home-broker.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-connection-state',
  templateUrl: './connection-state.component.html',
  styleUrls: ['./connection-state.component.scss'],
})
export class ConnectionStateComponent implements OnInit {

  statusConnected: Observable<boolean>;
  constructor(private homeBrokerService: HomeBrokerService) {
  }
  ngOnInit() {
    this.statusConnected = this.homeBrokerService.isConnectedAsObservable();
  }

}
