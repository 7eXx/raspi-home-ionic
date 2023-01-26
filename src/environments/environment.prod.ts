export const environment = {
  production: true,
  mqtt: {
    protocol: 'ws',
    server: '192.168.0.95',
    port: 9001,
    clientId: 'ionic-client',
    timeout: 3000,
    path: '/mqtt',
    statusTopic: 'mqtt/status',
    commandTopic: 'mqtt/command',
  }
};
