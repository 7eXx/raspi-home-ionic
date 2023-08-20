import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {ConnectionStateComponent} from './connection-state/connection-state.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ConnectionStateComponent,
  ],
  declarations: [ConnectionStateComponent],
})
export class SharedModule {
}
