require('app-module-path').addPath(__dirname + '/')
const server = require('./server')

const PORT = process.env.PORT || 3000
import { connectDatabase } from './app/db/index'
process.title = 'Essays-backend'
//start app
if (!module.parent) {
    (async () => {
        try {
            const info: any = await connectDatabase('mongodb://localhost/essaysdb')
            console.log(`Connected to ${info}`);
        } catch (error) {
            console.log('Unable to connect to database')
            console.log(error)
        }

        await server.listen(PORT, function () {
            console.log(
                `=============================================================
          [${process.platform}:${process.pid}]Starting ${process.title}
    =============================================================`
            )
        })
    })()

}