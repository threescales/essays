import Sequelize = require("sequelize")
export interface AccountInstance extends Sequelize.Instance<any> {

}

export default (sequelize:Sequelize.Sequelize,DataTypes:Sequelize.DataTypes) => {
    const Accounts: any = sequelize.define<AccountInstance,any>('accounts',{
        userId:{
            type:DataTypes.INTEGER,
            field:'user_id',
            allowNull:false,
        },
        type:{
            type:DataTypes.STRING,
            field:'type',
            allowNull:false,
        },
        info:{
            type:DataTypes.STRING,
            field:'info',
            allowNull:true,
        },
        openid:{
            type:DataTypes.STRING,
            field:'openid',
            allowNull:false,
        },
    },{
        tableName:'accounts',
        timestamps:true
    })
      return Accounts;  
}