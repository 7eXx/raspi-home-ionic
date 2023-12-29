import { IMqttServiceOptions } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';

export const mqttOptions: IMqttServiceOptions = {
  connectOnCreate: false,
  hostname: environment.mqtt.hostname,
  port: environment.mqtt.port,
  protocol: environment.mqtt.protocol === 'wss'? 'wss': 'ws',
  path: environment.mqtt.path,
  connectTimeout: environment.mqtt.timeout
};
