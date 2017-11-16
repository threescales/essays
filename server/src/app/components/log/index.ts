import pino = require('pino')

export const p = pino()
export const info = (...args: any[]) => p.info({...args})
export const error = (...args: any[]) => p.error({...args})
