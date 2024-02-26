import { IMqttServiceOptions } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';

let mqttUrl = environment.mqtt.baseUrl;
if (!mqttUrl) {
  mqttUrl = window.location.origin;
}

const mqttOptions: IMqttServiceOptions = {
  connectOnCreate: false,
  url: mqttUrl,
  protocol: environment.mqtt.protocol === 'wss'? 'wss': 'ws',
  path: environment.mqtt.path,
  connectTimeout: environment.mqtt.timeout
};

export { mqttOptions };
