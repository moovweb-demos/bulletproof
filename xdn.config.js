module.exports = {
  routes: './src/routes.ts',
  backends: {
    origin: {
      domainOrIp: 'www.bulletproof.com',
      hostHeader: 'www.bulletproof.com',
      domainOrIp: 'shop.bulletproof.com',
      hostHeader: 'shop.bulletproof.com',      
      disableCheckCert: process.env.DISABLE_CHECK_CERT || true,
    },
  },
}
