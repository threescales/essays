import fs = require('fs')
import path = require('path')
const config = require('../../config/db.json')
import Sequelize = require('sequelize')
if (process.env.NODE_ENV !== 'production') {
  const conf = JSON.stringify({ CurrentConfig: config }, null, 2)
  console.log(process.env.NODE_ENV)
  console.log(conf)
}

const uri = config.dev.uri
const sequelize = new Sequelize(uri, config.dev || {})
const db = {

} as {
    sequelize: Sequelize.Sequelize,
    Sequelize: Sequelize.SequelizeStatic
  }

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0
      && file.indexOf(".js.map") === -1
      && (file !== "index.js")
    )
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file)) as any
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db)
  }
})

initRelations(db as any)
db.sequelize = sequelize
db.Sequelize = Sequelize
db.sequelize.sync()
export default db


function initRelations(db: { [key: string]: Sequelize.Model<Sequelize.Instance<any>, any> }) {

  db.user.hasMany(db.accounts, {
    foreignKey: 'user_id',
    as: 'accounts'
  })
}
