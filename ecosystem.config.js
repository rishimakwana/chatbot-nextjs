module.exports = {
  apps: [
    {
      name: 'docbot',
      exec_mode: 'cluster',
      instances: 1,
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      watch: false,
      autorestart: false,
      env: {
        PORT: 6001,
        name: 'docbot',
      },
    },
  ],
}
