import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPage } from './info-page.component';
import { NgxGaugeModule } from 'ngx-gauge';

import { InfoPageRoutingModule } from './info-routing.module';
import { CpuComponent } from '../components/cpu/cpu.component';
import { MemoryComponent } from '../components/memory/memory.component';
import { DiskComponent } from '../components/disk/disk.component';

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
    MemoryComponent,
    DiskComponent
  ]
})
export class InfoPageModule {}
