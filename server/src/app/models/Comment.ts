import Sequelize = require("sequelize")
export interface CommentInstance extends Sequelize.Instance<any> {

}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    const Comments: any = sequelize.define<CommentInstance, any>('comments', {
        articleId: {
            type: DataTypes.INTEGER,
            field: 'article_id',
            allowNull: false
        },
        fromUserId:{
            type:DataTypes.INTEGER,
            field:'from_user_id',
            allowNull:false
        },
        content: {
            type: DataTypes.JSONB,
            field: 'content',
            allowNull: false
        },
        toCommentId: {
            type: DataTypes.INTEGER,
            field: 'to_comment_id',
            allowNull: true
        },
        depth: {
            type: DataTypes.INTEGER,
            field: 'depth',
            defaultValue: 0
        },
        blockKey: {
            type: DataTypes.STRING,
            field: 'block_key',
            allowNull: true
        },
        blockText: {
            type: DataTypes.STRING,
            field: 'block_text',
            allowNull: true
        },
        likeNum: {
            type: DataTypes.INTEGER,
            field: 'like_num',
            defaultValue: 0
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            field: 'enabled',
            defaultValue: true
        }
    }, {
            tableName: 'comments',
            timestamps: true
        })

    return Comments;
}