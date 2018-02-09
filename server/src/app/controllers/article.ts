import koa = require("koa");

import Sequelize = require("sequelize");
import Model from "../models/index";
import { ArticleInstance } from "../models/Article";
import { User, Tags, Accounts, Articles, Comments } from "../models/index";

import { parsePostData, parseGetData } from "../utils/parseData";
import { getRememberMeToken } from "../utils/encryption";
import { CookieKeys } from "../constants/cookieKeys";
import { addBlockCommentToBody } from "../utils/operaBlock";
import { getBucketManager } from "../components/qiniuSDK/index";
import { promisify } from "../utils/promisify";
import rq = require("request-promise");
import { QINIU_CDN } from "../constants/commonTypes";
export default class ArticleController {
  static async checkPermi(
    ctx: koa.Context,
    articleId = null
  ): Promise<ArticleInstance> {
    let userId = ctx.cookies.get(CookieKeys.USER_ID);
    let token = ctx.cookies.get(CookieKeys.REMEMBER_ME);

    if (articleId) {
      const article: any = await Articles.find({
        where: {
          id: articleId
        }
      });

      if (!article) {
        ctx.throw("未找到该文章", 404);
      }
      const uid = article.ownerId;

      if (getRememberMeToken(uid) !== token) {
        ctx.throw("你没有该权限,确认是否正常登录", 403);
      }
      return article;
    } else {
      if (getRememberMeToken(userId) !== token) {
        ctx.throw("你没有该权限,确认是否正常登录", 403);
      }
      return null;
    }
  }
  public static async createArticle(ctx: koa.Context) {
    let request: any = await parsePostData(ctx);
    ArticleController.checkPermi(ctx);

    let tags = request.tags;
    let tagArray = tags.split(",");
    for (let tagName of tagArray) {
      let tag = await Tags.find({
        where: {
          tagName: tagName
        }
      });
      console.log(tag);
      if (!tag) {
        await Tags.create({ tagName });
      }
    }
    const requestData = {
      ownerId: parseInt(request.userId),
      title: request.title,
      description: request.description,
      cover: request.cover,
      body: JSON.parse(request.body),
      tags: tagArray,
      isPublished: false,
      isPublic: false,
      readNum: 0,
      likeNum: 0
    };

    let data = await Articles.create(requestData);
    ctx.body = {
      data
    };
  }

  public static async getArticleById(ctx: koa.Context) {
    let article: any = await Articles.findById(ctx.params.articleId);
    let author = await User.findById(article.ownerId, {
      include: [{ model: Accounts, as: "accounts" }],
      attributes: {
        exclude: ["password", "email", "phone"]
      }
    });
    ctx.body = {
      data: {
        article,
        author
      }
    };
  }

  public static async saveBody(ctx: koa.Context) {
    let request: any = await parsePostData(ctx);
    let articleId = request.id;
    ArticleController.checkPermi(ctx, articleId);
    let body = JSON.parse(request.body);
    const article = await Articles.find({ where: { id: request.id } });
    let data = await article.update({ body });
    ctx.body = {
      data
    };
  }

  public static async getAllArticles(ctx: koa.Context) {
    let data = await Articles.findAll({
      where: { isPublished: true, isPublic: true },
      attributes: {
        exclude: ["body"]
      },
      order: [["createdAt", "DESC"]]
    });

    ctx.body = {
      data
    };
  }

  public static async getAllComments(ctx: koa.Context) {
    let articleId = parseGetData(ctx).articleId;
    let data = await Comments.findAll({
      where: {
        articleId: articleId,
        enabled: true
      },
      include: [{ model: User, as: "fromUser" }],
      order: [["id", "DESC"]]
    });
    ctx.body = {
      data
    };
  }

  public static async getMyArticles(ctx: koa.Context) {
    let userId = parseGetData(ctx).userId;
    let data = await Articles.findAll({
      where: {
        ownerId: userId
      },
      attributes: {
        exclude: ["body"]
      },
      order: [["createdAt", "DESC"]]
    });
    ctx.body = {
      data
    };
  }
  public static async togglePublish(ctx: koa.Context) {
    let request: any = await parsePostData(ctx);
    let articleId = request.articleId;
    let isPublished = request.isPublished;
    let article = await ArticleController.checkPermi(ctx, articleId);
    let data = await article.update({ isPublished: isPublished });
    ctx.body = {
      data
    };
  }

  public static async toggleInfo(ctx: koa.Context) {
    let request: any = await parsePostData(ctx);
    let articleId = request.articleId;
    let article: any = await ArticleController.checkPermi(ctx, articleId);
    if (request.title) {
      article.title = request.title;
    }
    if (request.description) {
      article.description = request.description;
    }
    if (request.cover) {
      article.cover = request.cover;
    }
    if (request.tags) {
      let tags = request.tags;
      let tagArray = tags.split(",");
      for (let tagName of tagArray) {
        let tag = await Tags.find({
          where: {
            tagName: tagName
          }
        });
        console.log(tag);
        if (!tag) {
          await Tags.create({ tagName });
        }
      }
      article.tags = request.tags;
    }
    let data = await article.save();
    ctx.body = {
      data
    };
  }

  public static async updateCount(ctx: koa.Context) {
    let request: any = await parsePostData(ctx);
    let article: any = await Articles.findById(request.articleId);
    if (request.type == "read") {
      article.readNum++;
    } else {
      article.likeNum++;
    }
    let data = await article.save();
    ctx.body = {
      readNum: data.readNum,
      likeNum: data.likeNum
    };
  }

  /**
   *
   * @param ctx
   * articleId
   * content
   * toCommentId
   *
   */
  public static async postComment(ctx: koa.Context) {
    let request: any = await parsePostData(ctx);
    let { blockKey, blockText, offset } = request;
    let articleId = parseInt(request.articleId);
    let article: any = await Articles.find({
      where: {
        id: articleId
      }
    });
    let userId = parseInt(ctx.cookies.get(CookieKeys.USER_ID));
    let commentData = {
      articleId: articleId,
      content: JSON.parse(request.content),
      fromUserId: userId,
      toCommentId: request.toCommentId ? parseInt(request.toCommentId) : null,
      depth: parseInt(request.depth),
      blockKey: blockKey ? blockKey : null,
      blockText: blockText ? blockText : null
    };
    let comment: any = await Comments.create(commentData);
    if (blockKey) {
      let newBody = addBlockCommentToBody(
        comment.id,
        article.body,
        blockKey,
        blockText,
        parseInt(offset)
      );
      article = await article.update({ body: newBody });
    }
    let data = await Comments.findById(comment.id, {
      include: [{ model: User, as: "fromUser" }]
    });
    ctx.body = {
      comment: data,
      article: article
    };
  }

  //通过url获取网页预览信息
  public static async getPageInfo(ctx: koa.Context) {
    let url: any = parseGetData(ctx).url;
    let data = {
      title: "",
      description: "",
      previewImg: ""
    };
    if (url.indexOf(ctx.host) > -1) {
      let articleId = url.split("/articles/")[1];
      let article: any = await Articles.findById(articleId);
      data.title = article.title;
      data.description = article.description;
      data.previewImg = article.cover;
    } else {
      let page = await rq.get(
        `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareget_urlinfo?url=${url}`
      );
      const length = page.length - 2;
      page = JSON.parse(page.toString().substring(10, length));
      data.title = page.title;
      data.description = page.summary;
      data.previewImg = page.pics.split("|")[0];
    }
    ctx.body = {
      data
    };
  }

  public static async getQiniuToken(ctx: koa.Context) {
    let imgUrl: any = parseGetData(ctx).imgUrl;
    let bucketManager = getBucketManager();
    let strArray = imgUrl.split("/");
    let fileName = strArray[strArray.length - 1];
    if (fileName.indexOf("?") > -1) {
      fileName = fileName.split("?")[0];
    }

    //回调方法
    function callback(err, respBody, respInfo) {}

    let getQiniuResult = promisify(callback => {
      bucketManager.fetch(imgUrl, "youming133", fileName, callback);
    }, ctx);
    let data: any = await getQiniuResult();
    let imageInfoUrl = `${QINIU_CDN}${data[0].key}?imageInfo`;
    console.log(imageInfoUrl);
    let imageInfo = await rq.get(imageInfoUrl);

    ctx.body = {
      statusCode: data[1].statusCode,
      hash: data[0].hash,
      key: data[0].key,
      mimeType: data[0].mimeType,
      size: data[0].fsize,
      imageInfo: imageInfo
    };
  }
}
