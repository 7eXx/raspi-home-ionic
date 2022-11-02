import { IMqttServiceOptions } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';

export const mqttOptions: IMqttServiceOptions = {
  connectOnCreate: false,
  host: environment.mqtt.server,
  port: environment.mqtt.port,
  protocol: environment.mqtt.protocol === 'wss'? 'wss': 'ws',
  clientId: environment.mqtt.clientId,
  connectTimeout: environment.mqtt.timeout,
  path: environment.mqtt.path,
};
