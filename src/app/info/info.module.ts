import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPage } from './info-page.component';
import { NgxGaugeModule } from 'ngx-gauge';

import { InfoPageRoutingModule } from './info-routing.module';
import { HomeBrokerService } from '../services/home-broker.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxGaugeModule,
    InfoPageRoutingModule,
  ],
  declarations: [InfoPage],
  providers: [
    HomeBrokerService
  ]
})
export class InfoPageModule {}
