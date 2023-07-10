import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MqttModule} from 'ngx-mqtt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { mqttOptions } from './services/mqtt-options';
import {HomeBrokerService} from './services/home-broker.service';
import {CommandRequestService} from './services/command-request.service';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    MqttModule.forRoot(mqttOptions),
    HttpClientModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    HomeBrokerService,
    CommandRequestService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
