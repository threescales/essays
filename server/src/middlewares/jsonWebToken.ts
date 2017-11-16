import jwt = require('koa-jwt')
import config = require('config')
export const secret = config['services']['jsonwebtoken']['key']
export const accessTokExpr = config['services']['jsonwebtoken']['accessTokExpr']
export const refreshTokExpr = config['services']['jsonwebtoken']['refreshTokExpr']

if (!secret || !accessTokExpr) {
  throw new TypeError('invalid redis config')
}
const p = { secret, tokenKey: 'token' }
export default jwt({ ...p } as any)
export const jwtPassthrough = jwt({ ...p, passthrough: true } as any)