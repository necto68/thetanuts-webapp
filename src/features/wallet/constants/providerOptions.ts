export const wsProviderOptions = {
  timeout: 5000,

  clientConfig: {
    keepalive: true,
    keepaliveInterval: 5000,
  },

  reconnect: {
    auto: true,
    delay: 2000,
    maxAttempts: 100,
    onTimeout: true,
  },
};
