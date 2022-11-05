import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPage } from './info-page.component';
import { NgxGaugeModule } from 'ngx-gauge';

import { InfoPageRoutingModule } from './info-routing.module';
import { HomeBrokerService } from '../services/home-broker.service';
import { CpuComponent } from '../cpu/cpu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxGaugeModule,
    InfoPageRoutingModule,
  ],
  declarations: [
    InfoPage,
    CpuComponent,
  ],
  providers: [
    HomeBrokerService
  ]
})
export class InfoPageModule {}
