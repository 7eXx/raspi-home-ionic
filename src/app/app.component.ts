import { Component } from '@angular/core';
import {HomeBrokerService} from './services/home-broker.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private homeBrokerService: HomeBrokerService) {}
}
