export default {
  port: 3000,
  dbUri: 'mongodb://auth-mongo-srv:27017/auth_v1',
  saltWorkFactor: 10,
  accessTokenTtl: "1m",
  refreshTokenTtl: "1y",
  publicKey: ``,
  privateKey: ``,

}