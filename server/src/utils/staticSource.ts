import { info, error } from '../app/components/log/index';
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
const manifestPath = join(__dirname, '../../../public/hole-manifest.json')
const scripts = ['common-in-lazy.js', 'vendor.js', 'index.js',]
const css = ['index.css']
let cache
let fileHash

export function getSource() {
  if (cache) {
    return cache
  }

  const isProduction = process.env.NODE_ENV === 'production'
  info('NODE_ENV:' + process.env.NODE_ENV)

  if (isProduction) {
    cache = findFilesForProduction()
    return cache
  } else {
    cache = {
      scripts: ['http://localhost:8080/index.js'],
      css: []
    }
    return cache
  }
}


function findFilesForProduction() {
  const hasFile = existsSync(manifestPath)
  let resource = {
    css: [],
    scripts: []
  }

  if (hasFile) {
    const file = readFileSync(manifestPath)
    const json = JSON.parse(file.toString())
    if (!fileHash) {
      fileHash = getFileHash(json)
    }

    const s = scripts.map(s => getPublicPath(json[s]))
    const style = css.map(s => getPublicPath(json[s]))
    resource.scripts = s
    resource.css = style
    info(s)
    info(style)

    return resource
  } else {
    throw new Error(`${manifestPath} must exist`)
  }
}

function getPublicPath(fileName: string) {
  const isLocal = process.env.LOCAL === 'local'
  if (!fileName) {
    error('file not exist:' + fileName)
  }

  if (!fileHash || fileHash.length !== 20) {
    throw 'Incorrect webpack file hash'
  }

  if (isLocal) {
    const path = 'http://localhost:3000/'
    return path + fileName
  } else {
    const path = process.env.CDN_HOST
    if (!path || !path.startsWith('http://') && !path.startsWith('https://')) {
      const errorMessage = 'you should define process.env.CDN_HOST startswith http(s):// in production'
      error(errorMessage)
      throw errorMessage
    } else {
      return path + `/${fileHash}/` + fileName
    }
  }
}

function getFileHash(json) {
  if (!json) {
    return
  }
  const indexjs = scripts[2]
  return json[indexjs]
    .replace(/index/, '')
    .replace(/\.js/, '')
}

getSource()