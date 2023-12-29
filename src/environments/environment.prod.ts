export const environment = {
  production: true,
  mqtt: {
    protocol: 'ws',
    hostname: 'mosquitto.raspi-home',
    port: 9001,
    clientId: 'ionic-client',
    timeout: 3000,
    path: '/mqtt',
    statusTopic: 'mqtt/status',
    commandTopic: 'mqtt/command',
  },
  apiServerUrl: '/api'
};
