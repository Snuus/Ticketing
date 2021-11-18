import jwt from 'jsonwebtoken'
import config from 'config'

const Secret = process.env.JWT_KEY

// When using public / private key setup
const privateKey = config.get<string>("privateKey")
const publicKey = config.get<string>("publicKey")



export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, Secret as string, {
    ...(options && options)
  });
}


export function verifyJwt(token: string) {

  try {
    console.log(token)
    const decoded = jwt.verify(token, Secret as string)

    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null
    }
  }
}
