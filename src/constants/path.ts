export const articlePage = '/articles/:articleId';
export const indexPage = '/';

//api

//article
export const putArticle = '/api/articles'
export const getArticle = (articleId: string):string => `/api/articles/${articleId}`
export const saveArticleBody = '/api/articles/savebody'