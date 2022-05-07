import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlarmPage } from './alarm-page.component';

import { AlarmPageRoutingModule } from './alarm-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AlarmPageRoutingModule
  ],
  declarations: [AlarmPage]
})
export class AlarmPageModule {}
