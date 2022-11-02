import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IMqttServiceOptions, MqttModule} from 'ngx-mqtt';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  connectOnCreate: false,
  host: environment.mqtt.server,
  port: environment.mqtt.port,
  protocol: environment.mqtt.protocol === 'wss'? 'wss': 'ws',
  clientId: environment.mqtt.clientId,
  connectTimeout: environment.mqtt.timeout,
  path: environment.mqtt.path,
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AppRoutingModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
