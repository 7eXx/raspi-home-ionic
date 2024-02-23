import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {MqttModule} from 'ngx-mqtt';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {mqttOptions} from './services/mqtt-options';
import {HomeBrokerService} from './services/home-broker.service';
import {HomeBrokerServiceImpl} from './services/home-broker-impl.service';
import {CommandRequestService} from './services/command-request.service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CommandRequestServiceImpl} from './services/command-request-impl.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    MqttModule.forRoot(mqttOptions),
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HomeBrokerService,
      useClass: HomeBrokerServiceImpl
    },
    {provide: CommandRequestService, useClass: CommandRequestServiceImpl}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
