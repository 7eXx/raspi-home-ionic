import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APP_INITIALIZER} from '@angular/core';
import {MqttService} from './services/mqtt.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function startupMqttService() {
  return (): Promise<void>  => new Promise<void>((resolve, reject) => resolve());
}
