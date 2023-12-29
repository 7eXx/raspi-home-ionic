import { IMqttServiceOptions } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';

export const mqttOptions: IMqttServiceOptions = {
  connectOnCreate: false,
  protocol: environment.mqtt.protocol === 'wss'? 'wss': 'ws',
  hostname: environment.mqtt.hostname,
  port: environment.mqtt.port,
  path: environment.mqtt.path,
  connectTimeout: environment.mqtt.timeout,
};
