module.exports = {
  routes: './src/routes.ts',
  backends: {
    origin: {
      domainOrIp: 'lxrco.com',
      hostHeader: 'lxrco.com',
      disableCheckCert: process.env.DISABLE_CHECK_CERT || true,
    },
  },
}
