import * as Koa from 'koa'
import { getUpToken } from '../components/qiniuSDK/index'
class Qiniu {
  static upTokenGen(ctx: Koa.Context) {
    const uptoken = getUpToken()
    ctx.body = {
      uptoken
    }
  }
}

export default Qiniu
