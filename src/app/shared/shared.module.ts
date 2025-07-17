import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {ConnectionStateComponent} from './connection-state/connection-state.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {HumidityComponent} from './humidity/humidity.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    NgxGaugeModule
  ],
  exports: [
    ConnectionStateComponent,
    TemperatureComponent,
    HumidityComponent
  ],
  declarations: [
    ConnectionStateComponent,
    TemperatureComponent,
    HumidityComponent
  ],
})
export class SharedModule {
}
