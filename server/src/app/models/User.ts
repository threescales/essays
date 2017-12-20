import Sequelize = require("sequelize")
export interface UserInstance extends Sequelize.Instance<any> {

}

export default (sequelize:Sequelize.Sequelize,DataTypes:Sequelize.DataTypes) => {
    const User: any = sequelize.define<UserInstance,any>('user',{
        name:{
            type:DataTypes.STRING,
            field:'name',
            allowNull:true,
        },
        password:{
            type:DataTypes.STRING,
            field:'password',
            allowNull:true,
        },
        phone:{
            type:DataTypes.STRING,
            field:'phone',
            allowNull:true,
        },
        email:{
            type:DataTypes.STRING,
            field:'email',
            allowNull:true,
        },
        avatar:{
            type:DataTypes.STRING,
            field:'avatar',
            allowNull:true,
        },
        introduction:{
            type:DataTypes.STRING,
            field:'introduction',
            allowNull:true,
        },
        isAdmin:{
            type:DataTypes.BOOLEAN,
            field:'is_admin',
            allowNull:false
        }
    },{
        tableName:'user',
        timestamps:true
    })
    return User;
}    