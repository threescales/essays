export const articlePage = '/articles/:articleId';
export const indexPage = '/';
export const loginPage = '/login'
export const myarticlesPage = '/myarticles'
export const accountPage = '/account'

//oauth
export const bindGithub = `/github_bind`
//api

//article
export const putArticle = '/api/articles'
export const getArticle = (articleId: string): string => `/api/articles/${articleId}`
export const saveArticleBody = '/api/article/savebody'
export const getAllArticles = "/api/articles"
export const getMyArticles = "/api/articles/getMyArticles"
export const toggleArticlePublish = '/api/article/togglePublish'
export const updateCount = '/api/article/updateCount'
//session
export const login = '/api/user/login'
export const getUserById = '/api/user'

//user
export const getUserInfo = (userId) => `/api/user/getInfo?userId=${userId}`

//pageInfo
export const getPageInfo = '/api/pageInfo'