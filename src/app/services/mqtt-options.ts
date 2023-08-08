import { IMqttServiceOptions } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';

export const mqttOptions: IMqttServiceOptions = {
  connectOnCreate: false,
  hostname: environment.mqtt.server,
  port: environment.mqtt.port,
  protocol: environment.mqtt.protocol === 'wss'? 'wss': 'ws',
  connectTimeout: environment.mqtt.timeout,
  path: environment.mqtt.path,
};
