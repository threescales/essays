import fs = require('fs')
import path = require('path')
const config = require('../../config/db.json')
import Sequelize = require('sequelize')

if (process.env.NODE_ENV !== 'production') {
  const conf = JSON.stringify({ CurrentConfig: config }, null, 2)
  console.log(process.env.NODE_ENV)
  console.log(conf)
}
var dbConfig = config.dev
if (process.env.NODE_ENV == 'production') {
  dbConfig = config.production
}
const uri = dbConfig.uri
const sequelize = new Sequelize(uri, dbConfig || {})
const db: any = {

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

export const Articles: Sequelize.Model<Sequelize.Instance<any>, any> = db.articles
export const Tags: Sequelize.Model<Sequelize.Instance<any>, any> = db.tags
export const User: Sequelize.Model<Sequelize.Instance<any>, any> = db.user
export const Accounts: Sequelize.Model<Sequelize.Instance<any>, any> = db.accounts
export const Comments: Sequelize.Model<Sequelize.Instance<any>, any> = db.comments

initRelations(db as any)
db.sequelize = sequelize
db.Sequelize = Sequelize
db.sequelize.sync()
export default db

function initRelations(db: { [key: string]: Sequelize.Model<Sequelize.Instance<any>, any> }) {

  User.hasMany(Accounts, {
    foreignKey: 'user_id',
    as: 'accounts'
  })
  Comments.belongsTo(User, {
    as: 'fromUser'
  })
}
