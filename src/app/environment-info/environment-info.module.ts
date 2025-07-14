import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvironmentInfoPageRoutingModule } from './environment-info-routing.module';

import { EnvironmentInfoPage } from './environment-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentInfoPageRoutingModule
  ],
  declarations: [EnvironmentInfoPage]
})
export class EnvironmentInfoPageModule {}
