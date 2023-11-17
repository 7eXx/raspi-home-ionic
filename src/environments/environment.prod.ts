export const environment = {
  production: true,
  mqtt: {
    protocol: 'ws',
    host: 'mosquitto.raspi-home',
    port: 9001,
    clientId: 'ionic-client',
    timeout: 3000,
    path: '/api/ws/mqtt',
    statusTopic: 'mqtt/status',
    commandTopic: 'mqtt/command',
  },
  apiServerUrl: '/api'
};
