import Sequelize = require("sequelize")
export interface TagInstance extends Sequelize.Instance<any> {

}

export default (sequelize:Sequelize.Sequelize,DataTypes:Sequelize.DataTypes) => {
    const Tags: any = sequelize.define<TagInstance,any>('tags',{
        tagName: {
            type: DataTypes.STRING,
            field: 'tag_name',
            allowNull: false,
        }
    },{
        tableName:'tags',
        timestamps:true
    })
    return Tags
}