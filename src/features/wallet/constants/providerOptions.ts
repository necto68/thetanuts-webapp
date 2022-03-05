export const wsProviderOptions = {
  clientConfig: {
    keepalive: true,
    keepaliveInterval: 60_000,
  },

  reconnect: {
    auto: true,
    delay: 5000,
    maxAttempts: 5,
    onTimeout: false,
  },
};
