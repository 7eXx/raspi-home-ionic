import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPage } from './info-page.component';
import { NgxGaugeModule } from 'ngx-gauge';

import { InfoPageRoutingModule } from './info-routing.module';
import { CpuLoadComponent } from '../components/cpu-load/cpu-load.component';
import { MemoryComponent } from '../components/memory/memory.component';
import { DiskComponent } from '../components/disk/disk.component';
import {SharedModule} from '../shared/shared.module';
import {CpuTemperatureComponent} from '../components/cpu-temperature/cpu-temperature.component';
import {DatetimeComponent} from '../components/datetime/datetime.component';
import {WakeOnLanComponent} from '../components/wake-on-lan/wake-on-lan.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        NgxGaugeModule,
        InfoPageRoutingModule,
        SharedModule,
    ],
  declarations: [
    InfoPage,
    DatetimeComponent,
    CpuLoadComponent,
    CpuTemperatureComponent,
    MemoryComponent,
    DiskComponent,
    WakeOnLanComponent
  ]
})
export class InfoPageModule {}
