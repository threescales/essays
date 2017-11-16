require('app-module-path').addPath(__dirname + '/')
const server = require('./server')

const PORT = 3000
process.title = 'Hole-backend'
//start app
if (!module.parent) {
    console.error('端口：：：：：：：：' + PORT)
    server.listen(PORT, function () {
        console.log(
            `=============================================================
      [${process.platform}:${process.pid}]Starting ${process.title}
=============================================================`
        )
    })
}