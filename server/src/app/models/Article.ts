import Sequelize = require("sequelize")

export interface ArticleInstance extends Sequelize.Instance<any> {
}

export interface Articles extends Sequelize.Model<ArticleInstance, any> {
}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    const Articles: any = sequelize.define<ArticleInstance, any>('articles', {
        ownerId: {
            type: DataTypes.INTEGER,
            field: 'owner_id',
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            field: 'title',
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            field: 'description',
            allowNull: true,
        },
        cover: {
            type: DataTypes.STRING,
            field: 'cover',
            allowNull: true,
        },
        body: {
            type: DataTypes.JSON,
            field: 'body',
            allowNull: true,
        },
        tags: {
            type: DataTypes.JSONB,
            field: 'tags',
            allowNull: true
        },
        isPublished:{
            type:DataTypes.BOOLEAN,
            field:'is_published',
            allowNull:true,
            defaultValue:false
        },
        isPublic:{
            type:DataTypes.BOOLEAN,
            field:'is_public',
            allowNull:true,
            defaultValue:false
        },
        readNum: {
            type: DataTypes.INTEGER,
            field: 'read_num',
        },
        likeNum: {
            type: DataTypes.INTEGER,
            field: 'like_num'
        }
    }, {
            tableName: 'articles',
            timestamps: true
        })
    return Articles
}