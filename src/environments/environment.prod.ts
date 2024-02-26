export const environment = {
  production: true,
  mqtt: {
    protocol: 'ws',
    hostname: 'mosquitto.raspi-home',
    port: 9001,
    baseUrl: '',
    path: '/mqtt',
    timeout: 3000,
    statusTopic: 'mqtt/status',
    commandTopic: 'mqtt/command',
  },
  apiServerUrl: '/api'
};
