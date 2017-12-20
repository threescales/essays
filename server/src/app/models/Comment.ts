import Sequelize = require("sequelize")
export interface CommentInstance extends Sequelize.Instance<any> {

}

export default (sequelize:Sequelize.Sequelize,DataTypes:Sequelize.DataTypes) => {
    const Comments: any = sequelize.define<CommentInstance,any>('comments',{},{})
    
    return Comments;
}