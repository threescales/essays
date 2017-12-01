export const articlePage = '/articles/:articleId';
export const indexPage = '/';
export const loginPage = '/login'
//api

//article
export const putArticle = '/api/articles'
export const getArticle = (articleId: string): string => `/api/articles/${articleId}`
export const saveArticleBody = '/api/articles/savebody'
export const getAllArticles = "/api/articles"

//user
export const login = '/api/user/login'
export const getUserById = '/api/user'