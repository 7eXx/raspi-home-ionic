import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GatePage } from './gate-page.component';

import { GatePageRoutingModule } from './gate-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GatePageRoutingModule
  ],
  declarations: [GatePage]
})
export class GatePageModule {}
