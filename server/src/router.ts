import * as Router from 'koa-router'
import {home} from './app/controllers/home'
export default function():Router {
    var router = new Router()
    router.get('/write',home)
    router.get('/welcome',home)
    return router    
}