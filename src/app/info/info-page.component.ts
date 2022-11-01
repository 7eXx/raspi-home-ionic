import { Component } from '@angular/core';
import { HomeBrokerService } from '../services/home-broker.service';

@Component({
  selector: 'app-info',
  templateUrl: 'info-page.component.html',
  styleUrls: ['info-page.component.scss']
})
export class InfoPage {

  title = 'Info';

  constructor(private homeBrokerService: HomeBrokerService) {}

}
